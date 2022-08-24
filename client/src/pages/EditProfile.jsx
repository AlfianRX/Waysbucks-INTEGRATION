import { API } from '../config/api';
import { AddForm, Navbar } from "../components";
import React, { useState,useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clip from './../assets/img/clip.png';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { UserContext } from '../context/userContext';

import kopi from './../assets/img/question.png'

function EditProfile() {

  const title = 'Edit Profile';
  document.title = 'Waysbucks | ' + title;

  const [state] = useContext(UserContext)
  let navigate = useNavigate();
  const { id } = useParams();

  const [profile, setProfile] = useState({}); //Store profile data
  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState("");

  const [form, setForm] = useState({
    phone: '',
    address: '',
    image: '',
  });

  let { data: profiles, refetch } = useQuery('profileCache', async () => {
    const response = await API.get('/profile/' + id);
    return response.data.data;
  });

  console.log(profiles);

  // mounting data profile
  useEffect(() => {
    if (profiles) {
      setPreview(profiles.image);
      setForm({
        ...form,
        phone: profiles.phone,
        address: profiles.address,
      });
      setProfile(profile);
    }
  }, [profiles]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

  //handle preview image
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setPreviewName(e.target.files[0].name);
    }
  };

  // Create function for handle insert profile data with useMutation here ...
  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set('image', form?.image[0], form?.image[0]?.name);
      }
      formData.set('phone', form.phone);
      formData.set('address', form.address);

      // Insert profile data
      const response = await API.patch('/profile/' + profiles.id, formData, config);
      setForm(response.data.data)

      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className='container d-flex justify-content-center'>
      <Navbar />
      <>
      <div className='row justify-content-between' style={{ marginTop: 90, width: '90%' }}>
      <div className='col-6'>
        <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div data-bs-dismiss="modal" id='modalClose'></div>
          <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content thanks-message">

              <div class="modal-body">
                <p>Edit Profile Success</p>
              </div>

            </div>
          </div>
        </div>
        <h2 className='text-red mb-5'>Edit Profile</h2>
        <form onSubmit={ (e) => handleOnSubmit.mutate(e) }>
          <input className="form-control input-red mb-4" type="text" 
          name='phone' onChange={handleChange} placeholder={`Phone Number`} 
          aria-label="default input example" />
          <input className="form-control input-red mb-4" type="text" 
          name='address' placeholder="Address" onChange={handleChange} 
          aria-label="default input example" />
          <div className="mb-5">
            <input type="file" className="form-control input-file-red" id="inputGroupFile02" name='image' onChange={handleChange}/>
            <label className="form-control label-file" htmlFor="inputGroupFile02">
              <p className='m-0'> {previewName === "" ? "Photo Profile" : previewName}</p>
              <img style={{ height: 20 }} src={clip} alt="clip" />
            </label>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-red mx-auto" style={{ width: '100%' }} type="submit"
            >Edit Profile</button>
          </div>
        </form>
      </div>
      <img className='col-5' src={preview || state.user.profile.image} alt="Edit Profile" />
      </div >
      </>

    </div>
  )
}

export default EditProfile