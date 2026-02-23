import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import Cropper from 'react-easy-crop'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const [rawImgUrl, setRawImgUrl] = useState('')
  const [showCropper, setShowCropper] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl } = useContext(AppContext)
  const { aToken } = useContext(AdminContext)

  const onFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (rawImgUrl) URL.revokeObjectURL(rawImgUrl)
    const nextUrl = URL.createObjectURL(file)
    setRawImgUrl(nextUrl)
    setShowCropper(true)
    setZoom(1)
    setCrop({ x: 0, y: 0 })
  }

  const CROPPED_SIZE = 512 // enforce consistent square output

  const getCroppedImg = (imageSrc, cropPixels) => {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.src = imageSrc
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = CROPPED_SIZE
        canvas.height = CROPPED_SIZE
        const ctx = canvas.getContext('2d')
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height

        ctx.drawImage(
          image,
          cropPixels.x * scaleX,
          cropPixels.y * scaleY,
          cropPixels.width * scaleX,
          cropPixels.height * scaleY,
          0,
          0,
          CROPPED_SIZE,
          CROPPED_SIZE
        )

        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error('Canvas is empty'))
          resolve(blob)
        }, 'image/jpeg', 0.9)
      }
      image.onerror = (error) => reject(error)
    })
  }

  const applyCrop = async () => {
    if (!rawImgUrl || !croppedAreaPixels) {
      setShowCropper(false)
      return
    }
    try {
      const blob = await getCroppedImg(rawImgUrl, croppedAreaPixels)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      const file = new File([blob], `doctor_${Date.now()}.jpeg`, { type: blob.type })
      const nextPreview = URL.createObjectURL(blob)
      setDocImg(file)
      setPreviewUrl(nextPreview)
      setShowCropper(false)
    } catch (error) {
      toast.error('Failed to crop image')
      console.log(error)
    }
  }

  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels)
  }

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      if (rawImgUrl) URL.revokeObjectURL(rawImgUrl)
    }
  }, [previewUrl, rawImgUrl])

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (!docImg) return toast.error('Image Not Selected')
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setPreviewUrl('')
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='px-5 py-6 w-full'>

      <h2 className='text-2xl font-semibold mb-6 border-b pb-2'>Add New Doctor</h2>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>

        <div className='flex flex-col items-center gap-3 bg-white border rounded-xl p-6'>
          <label htmlFor='doc-img'>
            <img
              className='w-28 h-28 rounded-full object-cover cursor-pointer border'
              src={previewUrl || assets.upload_area}
              alt=''
            />
          </label>
          <input id='doc-img' type='file' accept='image/*' hidden onChange={onFileSelect} />
          <button type='button' onClick={() => document.getElementById('doc-img').click()} className='text-sm text-blue-600 underline'>Change Photo</button>
          <p className='text-gray-600 text-sm tracking-wide'>Click to upload doctor photo</p>
        </div>

        <div className='xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border rounded-xl p-6'>

          <input type="text" placeholder="Doctor Name" className='border px-3 py-2 rounded' value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" placeholder="Email" className='border px-3 py-2 rounded' value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className='border px-3 py-2 rounded' value={password} onChange={e => setPassword(e.target.value)} required />
          
          <select className='border px-3 py-2 rounded' value={experience} onChange={e => setExperience(e.target.value)}>
            <option>1 Year</option><option>2 Years</option><option>3 Years</option><option>4 Years</option>
            <option>5 Years</option><option>6 Years</option><option>8 Years</option><option>9 Years</option><option>10 Years</option>
          </select>

          <input type="number" placeholder="Consulting Fees" className='border px-3 py-2 rounded' value={fees} onChange={e => setFees(e.target.value)} required />

          <select className='border px-3 py-2 rounded' value={speciality} onChange={e => setSpeciality(e.target.value)}>
            <option>General physician</option><option>Gynecologist</option><option>Dermatologist</option>
            <option>Pediatricians</option><option>Neurologist</option><option>Gastroenterologist</option>
          </select>

          <input type="text" placeholder="Degree" className='border px-3 py-2 rounded' value={degree} onChange={e => setDegree(e.target.value)} required />

          <input type="text" placeholder="Address line 1" className='border px-3 py-2 rounded' value={address1} onChange={e => setAddress1(e.target.value)} required />
          <input type="text" placeholder="Address line 2" className='border px-3 py-2 rounded' value={address2} onChange={e => setAddress2(e.target.value)} required />

        </div>
      </div>

      <div className='mt-6 bg-white border rounded-xl p-6'>
        <textarea rows={5} placeholder='Write about doctor' className='border w-full px-4 py-2 rounded'
          value={about} onChange={e => setAbout(e.target.value)}></textarea>
      </div>

      <div className='mt-6 text-right'>
        <button type='submit' className='bg-primary text-white px-12 py-3 rounded-full font-medium'>Add Doctor</button>
      </div>

      {showCropper && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4'>
          <div className='bg-white rounded-xl shadow-2xl p-4 w-full max-w-3xl'>
            <div className='relative w-full h-96 bg-gray-900 rounded-lg overflow-hidden'>
              <Cropper
                image={rawImgUrl}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className='mt-4 flex items-center gap-4'>
              <div className='flex-1'>
                <p className='text-sm text-gray-700 mb-1'>Zoom</p>
                <input
                  type='range'
                  min='1'
                  max='3'
                  step='0.1'
                  value={zoom}
                  onChange={e => setZoom(Number(e.target.value))}
                  className='w-full'
                />
              </div>
              <div className='flex gap-3'>
                <button type='button' onClick={() => setShowCropper(false)} className='px-4 py-2 border rounded-full text-gray-700'>Cancel</button>
                <button type='button' onClick={applyCrop} className='px-4 py-2 bg-primary text-white rounded-full'>Use Photo</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </form>
  )
}

export default AddDoctor
