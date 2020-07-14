import React, { useState, useEffect } from 'react'
import { Input, Button, Row, Col } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {withRouter} from 'react-router-dom';

const { TextArea } = Input;

function Comment(props) {

  let productId = props.productId;
  const user = useSelector(state => state.user);
  const [Content, setContent] = useState('');
  const [Comments, setComments] = useState([]);

  useEffect(() => {
    commentList();
  }, []);

  const commentList = () => {
    axios.get(`/api/comment/${productId}`)
      .then(response => {
        if (response.data.success) {
          console.log(response.data.results);
          setComments(response.data.results);
        } else {
          alert('댓글 불러오기 실패!');
        }
      })
  }
  const onContentHandler = (event) => {
    setContent(event.target.value);
  }

  const onSubmitHandler = () => {
    let body = {
      productFrom: productId,
      userFrom: user.userData._id,
      userEmail: user.userData.email,
      content: Content
    }

    axios.post('/api/comment', body)
      .then(response => {
        if (response.data.success) {
          commentList();
        } else {
          alert("댓글 등록 실패!");
          props.history.push('/login');
        }
      })
  }

  const onCommentDeleteHandelr = (commentId)=>{
    const confirm = window.confirm('댓글을 삭제하시겠습니까?');

    if(confirm){
      axios.delete('/api/comment', {data:{userFrom:user.userData._id, productFrom:productId, commentId:commentId}})
      .then(response=>{
        if(response.data.success){
          commentList();
        }else{
          alert('댓글 삭제 실패!');
        }
      });
    }
  }

  return (
    <div>

      <div>
        {Comments && Comments.map((value, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <span style={{marginRight:'10px'}}>{value.userEmail}</span>
            {localStorage.getItem('userId')===value.userFrom?
              <button onClick={()=>onCommentDeleteHandelr(value._id)}>삭제</button>:""}
            <br/>
            <span>{value.createdAt}</span><br/>
            <span style={{ fontSize: '24px' }}>{value.content}</span>
            <hr />
          </div>
        ))}
      </div>
      <Row gutter={16}>
        <Col span={20}>
          <TextArea rows={4} value={Content} onChange={onContentHandler}></TextArea>
        </Col>
        <Col span={4}>
          <Button type="primary" style={{ height: '100%', width: '100%' }} onClick={onSubmitHandler}>등록</Button>
        </Col>
      </Row>
      <hr />
    </div>
  )
}

export default withRouter(Comment)
