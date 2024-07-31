import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import {
  Layout,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Typography,
  Space,
  Checkbox,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "../style/table.css";

const { Option } = Select;

const TableList = ({ onAdd }) => {
  return (
    <div className="table-list">
      <h4>Daftar Isi</h4>
      <select name="minat" id="karir">
        <option value="volvo">Minat Karir</option>
        <option value="saab">Psikotes</option>
      </select>
      <button type="button" id="btn-table" onClick={onAdd}>
        Tambah Soal
      </button>
    </div>
  );
};

export default function CustomTable() {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from("questions").select("*");

    if (error) console.log("Error fetching data:", error);
    else setData(data);
  };

  const deleteRow = async (id) => {
    const { error } = await supabase.from("questions").delete().eq("id", id);

    if (error) console.log("Error deleting data:", error);
    else fetchData();
  };

  const handleCheckboxChange = async (id, value) => {
    const newValue = value === "Yes" ? "No" : "Yes";
    const { error } = await supabase
      .from("questions")
      .update({ pilihan_jawaban: newValue })
      .eq("id", id);

    if (error) console.log("Error updating data:", error);
    else fetchData();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleAddQuestion = async (values) => {
    const { error } = await supabase.from("questions").insert([values]);

    if (error) console.log("Error adding data:", error);
    else {
      fetchData();
      setIsModalVisible(false);
      form.resetFields();
    }
  };

  const columns = [
    {
      title: "Halaman",
      dataIndex: "halaman",
      key: "halaman",
      align: "center",
    },
    {
      title: "Soal",
      dataIndex: "soal",
      key: "soal",
      align: "center",
    },
    {
      title: "Pilihan Jawaban",
      key: "pilihan_jawaban",
      render: (text, record) => (
        <Space>
          <Checkbox
            checked={record.pilihan_jawaban === "Yes"}
            onChange={() => handleCheckboxChange(record.id, "Yes")}
          >
            Yes
          </Checkbox>
          <Checkbox
            checked={record.pilihan_jawaban === "No"}
            onChange={() => handleCheckboxChange(record.id, "No")}
          >
            No
          </Checkbox>
        </Space>
      ),
      align: "center",
    },
    {
      title: "Minat Karir Tipe",
      dataIndex: "minat_karir_tipe",
      key: "minat_karir_tipe",
      align: "center",
    },
    {
      title: "Waktu (Detik)",
      dataIndex: "waktu",
      key: "waktu",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button icon={<DeleteOutlined />} onClick={() => deleteRow(record.id)}>
          Delete
        </Button>
      ),
      align: "center",
    },
  ];

  return (
    <div className="table-container">
      <TableList onAdd={showModal} />
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
      />
      <Modal
        title="Tambah Soal"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddQuestion}>
          <Form.Item
            name="halaman"
            label="Halaman"
            rules={[
              { required: true, message: "Please input the page number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="soal"
            label="Soal"
            rules={[{ required: true, message: "Please input the question!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="minat_karir_tipe"
            label="Minat Karir Tipe"
            rules={[
              {
                required: true,
                message: "Please select the career interest type!",
              },
            ]}
          >
            <Select placeholder="Select a career interest type">
              <Option value="realistic">Realistic</Option>
              <Option value="artistic">Artistic</Option>
              <Option value="artistic">Enterpreneur</Option>
              <Option value="artistic">Investigative</Option>
              <Option value="artistic">Social</Option>
              <Option value="artistic">Conventional</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="waktu"
            label="Waktu (Detik)"
            rules={[
              { required: true, message: "Please input the time in seconds!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tambah
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
