import React, { useState } from 'react';
import { useMutation, gql, ApolloProvider } from '@apollo/client';
import { Upload, Button, Input, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ApolloClient from './apollo-client';
import { RcFile } from 'antd/lib/upload';

const UPLOAD_PHOTO = gql`
    mutation uploadPhoto($name: String!, $file: Upload!) {
        uploadPhoto(name: $name, file: $file) {
            id
            name
            photoUrl
        }
    }
`;

const App: React.FC = () => {
    const [name, setName] = useState('');
    const [file, setFile] = useState<RcFile | null>(null);
    const [uploadPhoto] = useMutation(UPLOAD_PHOTO);

    const handleUpload = async () => {
        if (file) {
            const { data } = await uploadPhoto({
                variables: {
                    name,
                    file
                }
            });
            console.log(data);
        }
    };

    return (
        <Form>
            <Form.Item label="Name">
                <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Upload Photo">
                <Upload
                    beforeUpload={(file) => {
                        setFile(file as RcFile);
                        return false;
                    }}
                    accept="image/*"
                >
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={handleUpload}>Upload</Button>
            </Form.Item>
        </Form>
    );
};

const WrappedApp = () => (
    <ApolloProvider client={ApolloClient}>
        <App />
    </ApolloProvider>
);

export default WrappedApp;
