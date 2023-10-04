import React, { useState } from 'react'

const App = () => {
  const [formFields, setFormFields] = useState({
      username:'',email:'',password:''
  })
  const { username, email, password } = formFields;
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageLoad, setImageLoad] = useState(false);
  const handleChange = (e) => {
    setFormFields((prevValue) => ({
      ...prevValue,
      [e.target.name] : e.target.value
    }))
  }

  const imageChange = (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    setImage(file);
  }

  // upload_preset:vgvxg0kj
  // username:djo5zsnlq

  const uploadImage = async () => {
    const data = new FormData();
    data.append('file',image);
    data.append('upload_preset', 'vgvxg0kj');
    try {
      setImageLoad(true);
      let response = await fetch('https://api.cloudinary.com/v1_1/djo5zsnlq/image/upload', {
        method:'POST',
        body: data,
      })
      let urlData = response.json();
      setImageLoad(false);      
      return urlData;
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const url = await uploadImage(image)
    const userData = {
      username,email,password,image:url.url
    }
    const data = await fetch('http://localhost:3001/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(userData)
    })
    let response = await data.json();
    console.log(response)
    return response.data;
  }


  return (
    <>
      <div className="container col-md-5 mt-5 mx-auto border p-3 rounded">
        <h1 className="display-1 text-center">
          Register
        </h1>
        <form>
          <div className="container col-lg-4 m-auto border p-2">
            <img style={{width:'100%'}} src={imagePreview && imagePreview} alt="" />
          </div>
          <label htmlFor="">Image</label>
          <input onChange={imageChange} className='form-control' type="file" />
          <label htmlFor="">Name</label>
         <input name='username' value={formFields.username} onChange={handleChange} className='form-control' type="email" />
           <label htmlFor="">Email</label>
          <input name='email' value={formFields.email} onChange={handleChange} className='form-control' type="email" />
           <label htmlFor="">Password</label>
          <input name='password' value={formFields.password} onChange={handleChange} className='form-control' type="password" />
          <button onClick={handleSubmit} className={`btn w-100 my-3 ${imageLoad? 'btn-secondary' : 'btn-info'}`}>
            Register
        </button>
        </form>
      </div>
    </>
  )
}

export default App
