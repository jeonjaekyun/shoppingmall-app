import React, { useState } from 'react'
import { Button, Input} from 'antd';
import FileUpload from '../../utils/FileUpload'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
const { TextArea } = Input;

const Category = [
    { key: 1, value: "채소" },
    { key: 2, value: "과일" },
    { key: 3, value: "육류" },
    { key: 4, value: "가공식품" },
    { key: 5, value: "냉장식품" }
]

function UploadProductPage(props) {

    
    const user = useSelector(state => state.user);

    const [TitleValue, setTitleValue] = useState("");
    const [DescriptionValue, setDescriptionValue] = useState("");
    const [PriceValue, setPriceValue] = useState("");
    const [CategoryValue, setCategoryValue] = useState(1);

    const [Images, setImages] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onCategorySelectChange = (event) => {
        setCategoryValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            writer:user.userData._id,
            title:TitleValue,
            description:DescriptionValue,
            price:PriceValue,
            images: Images,
            category:CategoryValue
        }

        axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if(response.data.success){
                    alert('업로드 완료');
                    props.history.push('/');
                }else{
                    alert('업로드 실패!');
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>상품 등록</h2>
            </div>


            <form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>상품명</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>설명</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>가격</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />
                <br /><br />
                <label>카테고리</label><br />
                <select onChange={onCategorySelectChange} value={CategoryValue}>
                    {Category.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />

                <Button htmlType="submit" type="primary">
                    등록
                </Button>

            </form>

        </div>
    )
}

export default withRouter(UploadProductPage)