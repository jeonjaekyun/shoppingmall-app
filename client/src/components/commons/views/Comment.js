import React,{useState} from 'react'
import { Comment, Form, Button, List, Input } from 'antd';
const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  );
  
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );
  
function comment() {

    
    return (
        <div>
            {/* {Comments.length > 0 && <CommentList comments />} */}
            <Comment
                content={
                    <Editor
                        onChange
                        onSubmit
                        submitting
                        value
                    />
                }
            />
        </div>
    )
}

export default comment;