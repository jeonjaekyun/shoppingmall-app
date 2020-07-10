import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {

                    setImages([...Images, response.data.image]);
                    props.refreshFunction([...Images, response.data.image]);

                } else {
                    alert('이미지 저장 실패!');
                }
            })
    }

    const onDelete = (image) => {
        //{data:{image}} body로 보내는 방법
        axios.delete('/api/product/uploadImage', {data:{image}})
            .then(response => {
                if (response.data.success) {
                    const currentIndex = Images.indexOf(image);
                    let newImages = [...Images];
                    newImages.splice(currentIndex, 1);

                    console.log(image);
                    setImages(newImages);
                    props.refreshFunction(newImages);
                } else {
                    alert('업로드 이미지 삭제 실패!');
                }
            });
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        {/* {console.log('getRootProps', { ...getRootProps() })}
                        {console.log('getInputProps', { ...getInputProps() })} */}
                        <input {...getInputProps()} />
                        <PlusOutlined style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {Images.map((image, index) => (
                    <div key={index} onClick={()=>onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} 
                            src={`http://localhost:5000/${image}`} alt={`productImg-${index}`}/>
                    </div>
                ))}


            </div>

        </div>
    )
}

export default FileUpload