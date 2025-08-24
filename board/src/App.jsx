import { useState } from 'react'
import './App.css'


export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState({})

  // Passwordni tekshiruvchi funksiya
  function validatePassword(password) {
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)
    }
    return {
      isValid: Object.values(checks).every(Boolean),
      checks
    }
  }

  // Email validatsiya
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Forma yuborilganda tekshirish
  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}

    if (formData.name.length < 4) {
      newErrors.name = "Ism kamida 4 ta belgi bo‘lishi kerak"
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Email noto‘g‘ri formatda"
    }

    const passwordCheck = validatePassword(formData.password)
    if (!passwordCheck.isValid) {
      newErrors.password = "Parol kuchsiz (raqam, harf va symbol bo‘lishi kerak, uzunligi 8+)"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      alert("✅ Forma muvaffaqiyatli yuborildi")
      console.log("Form Data:", formData)
    }
  }

  // Input o‘zgarishini saqlash
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-lg p-6 rounded-2xl w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Ro‘yxatdan o‘tish</h2>

        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium">Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Yuborish
        </button>
      </form>
    </div>
  )
}

