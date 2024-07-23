import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import "../style/table.css";

// Initialize Supabase client

function TableList() {
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
}

export default function Table() {
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

  return (
    <div className="table-container">
      <TableList />
      <table className="tabel-item">
        <thead>
          <tr>
            <th>Halaman</th>
            <th>Soal</th>
            <th>Pilihan Jawaban</th>
            <th>Minat Karir Tipe</th>
            <th>Waktu (Detik)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.halaman}</td>
              <td>{item.soal}</td>

              <td>
                <tr>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.pilihan_jawaban === "Yes"}
                      onChange={() =>
                        handleCheckboxChange(item.id, item.pilihan_jawaban)
                      }
                    />
                    Yes
                  </label>
                </tr>
                <tr>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.pilihan_jawaban === "No"}
                      onChange={() =>
                        handleCheckboxChange(item.id, item.pilihan_jawaban)
                      }
                    />
                    No
                  </label>
                </tr>
              </td>
              <td>{item.minat_karir_tipe}</td>
              <td>{item.waktu}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => deleteRow(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
