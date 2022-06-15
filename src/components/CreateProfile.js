import axios from 'axios';
import React, { useState } from 'react'
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function CreateProfile() {
    const { id } = useParams();
    const {user:{_id}} = useSelector(state => state.auth.user);
    
    const [form, setForm] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
    });



    const handleProfile = async(e) => {
        e.preventDefault();
        const { company, website, location, status, githubusername, bio, twitter, facebook, linkedin, youtube, instagram } = form;
        console.log(form);
        const profileData = {
            _id,
            company,
            website,
            location,
            status,
            githubusername,
            bio,
            twitter,
            facebook,
            linkedin,
            youtube,
            instagram
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            const data = {
                profileData
            }
            const res = await axios.post(`http://localhost:5000/api/profile/createProfile/${id}`, data, config);
            console.log(res);



        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="container my-5">
            <div className="text-center ">
                <Avatar name='Profile' size='100' round={true} color='green' />
                <h2 className='my-3'>Create Profile</h2>
            </div>
            <div className="row">
                <div className="col-md-8 m-auto ">
                    Create Profile
                    <form className="row g-3" onSubmit={handleProfile}>
                        <div className="col-md-6">
                            <input type="text"
                                className="form-control form-control-lg"
                                placeholder="Company"
                                name="company"
                                value={form.company}
                                onChange={(e) => setForm({ ...form, company: e.target.value })}

                            />
                        </div>
                        <div className="col-md-6">
                            <input type="text"
                                className="form-control form-control-lg"
                                placeholder="Website"
                                name="website"
                                value={form.website}
                                onChange={(e) => setForm({ ...form, website: e.target.value })}


                            />
                        </div>
                        <div className="col-12">
                            <label for="inputAddress" className="form-label">Bio</label>
                            <textarea className="form-control form-control-lg"
                                placeholder="A short bio of yourself"
                                name="bio"
                                value={form.bio}
                                onChange={(e) => setForm({ ...form, bio: e.target.value })}

                            />
                        </div>


                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">City</label>
                            <input type="text"
                                className="form-control form-control-lg"
                                placeholder="Location"
                                name="location"
                                value={form.location}
                                onChange={(e) => setForm({ ...form, location: e.target.value })}

                            />
                        </div>
                        

                      
                        <div className="col-md-12 form-group">
                            <label for="inputCity" className="form-label">Status</label>
                        <select class="form-select form-control" 
                        name='status'
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        
                        >
                            <option value='0'>Select your Status</option>
                            <option value="1">Developer</option>
                            <option value="2">Junior Developer</option>
                            <option value="3">Senior Developer</option>
                        </select>
                        </div>
                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">Github Account</label>
                            <input type="text" className="form-control form-control-lg"
                                placeholder="Github User name"
                                name="githubusername"
                                value={form.githubusername}
                                onChange={(e) => setForm({ ...form, githubusername: e.target.value })}



                            />
                        </div>
                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">Twitter</label>
                            <input type="text" className="form-control form-control-lg"
                                placeholder="Twitter Account"
                                name="twitter"
                                value={form.twitter}
                                onChange={(e) => setForm({ ...form, twitter: e.target.value })}

                            />
                        </div>
                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">Facebook</label>
                            <input type="text" className="form-control form-control-lg"

                                placeholder="Facebook Account"
                                name="facebook"
                                value={form.facebook}
                                onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">Linkedin</label>
                            <input type="text" className="form-control form-control-lg"
                                placeholder="Linkedin Account"
                                name="linkedin"
                                value={form.linkedin}
                                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}


                            />
                        </div>
                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">Youtube</label>
                            <input type="text" className="form-control form-control-lg"
                                placeholder="Youtube Account"
                                name="youtube"
                                value={form.youtube}
                                onChange={(e) => setForm({ ...form, youtube: e.target.value })}

                            />
                        </div>
                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">Instagram</label>
                            <input type="text" className="form-control form-control-lg"

                                name="instagram"
                                value={form.instagram}
                                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                                placeholder="Instagram Account" />

                        </div>


                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Create Profile</button>
                        </div>
                    </form>
                    {/* ++++++++++++++++++++++++++ */}

                </div>
            </div>

        </div>
    )
}

export default CreateProfile
