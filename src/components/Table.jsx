import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { Table, Button, Space, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "../style/table.css";

const TableList = () => {
  return (
    <div className="table-list">
      <h4>Daftar Isi</h4>
      <select name="minat" id="karir">
        <option value="volvo">Minat Karir</option>
        <option value="saab">Psikotes</option>
      </select>
      <button type="submit" id="btn-table">
        Tambah Soal
      </button>
    </div>
  );
};

export default function CustomTable() {
  const [data, setData] = useState([]);

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
      <TableList />
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
      />
    </div>
  );
}
