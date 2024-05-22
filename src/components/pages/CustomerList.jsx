import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "tailwindcss/tailwind.css";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [visible, setVisible] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: "",
  });
  const dt = useRef(null);

  useEffect(() => {
    // Simulating data fetch
    const fetchedCustomers = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "555-1234",
        balance: 1000,
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        phone: "555-5678",
        balance: 2000,
      },
      {
        id: 3,
        firstName: "Bob",
        lastName: "Smith",
        email: "bob.smith@example.com",
        phone: "555-8765",
        balance: 1500,
      },
      {
        id: 4,
        firstName: "Alice",
        lastName: "Brown",
        email: "test@gmail.com ",
        phone: "555-5678",
        balance: 2000,
      },
      {
        id: 5,
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        phone: "555-5678",
        balance: 2000,
      },
      {
        id: 6,
        firstName: "Bob",
        lastName: "Smith",
        email: "bob.smith@example.com",
        phone: "555-8765",
        balance: 1500,
      },
      {
        id: 7,
        firstName: "Alice",
        lastName: "Brown",
        email: "test@gmail.com ",
        phone: "555-5678",
        balance: 2000,
      },
    ];
    setCustomers(fetchedCustomers);
  }, []);

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Müşteri Listesi</h2>
        <div className="flex space-x-2">
          <Button
            icon="pi pi-plus"
            label="Yeni Müşteri Ekle"
            className="p-button-success"
            onClick={() => setVisible(true)}
          />
          <span className="p-input-icon-left">
            <InputText
              type="search"
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Ara..."
              className="p-2 border rounded-lg"
            />
          </span>
        </div>
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex space-x-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning"
          tooltip="Düzenle"
          style={{ backgroundColor: "#fbbf24", borderColor: "#fbbf24" }} // Tailwind color amber-400
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          tooltip="Sil"
          style={{ backgroundColor: "#f87171", borderColor: "#f87171" }} // Tailwind color red-400
        />
      </div>
    );
  };

  const header = renderHeader();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewCustomer({ ...newCustomer, [id]: value });
  };

  const handleSave = () => {
    setCustomers([...customers, { id: customers.length + 1, ...newCustomer }]);
    setNewCustomer({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      balance: "",
    });
    setVisible(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <DataTable
          ref={dt}
          value={customers}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          globalFilter={globalFilter}
          header={header}
          className="p-datatable-sm"
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="id"
            header="ID"
            sortable
            style={{ minWidth: "50px" }}
          />
          <Column
            field="firstName"
            header="Ad"
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            field="lastName"
            header="Soyad"
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            field="email"
            header="Email"
            sortable
            style={{ minWidth: "200px" }}
          />
          <Column
            field="phone"
            header="Telefon"
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            field="balance"
            header="Bakiye"
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            body={actionBodyTemplate}
            header="İşlemler"
            style={{ minWidth: "150px" }}
          />
        </DataTable>
      </div>

      <Dialog
        header={
          <h2 className="text-2xl font-bold text-gray-900">
            Yeni Müşteri Ekle
          </h2>
        }
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
        className="rounded-lg shadow-lg"
      >
        <div className="p-6 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-6">
            <div className="field">
              <label
                htmlFor="firstName"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Ad
              </label>
              <input
                id="firstName"
                type="text"
                value={newCustomer.firstName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="field">
              <label
                htmlFor="lastName"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Soyad
              </label>
              <input
                id="lastName"
                type="text"
                value={newCustomer.lastName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="field">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                value={newCustomer.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="field">
              <label
                htmlFor="phone"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Telefon
              </label>
              <input
                id="phone"
                type="text"
                value={newCustomer.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-6">
            <div className="field">
              <label
                htmlFor="balance"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Bakiye
              </label>
              <input
                id="balance"
                type="text"
                value={newCustomer.balance}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="field flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white font-semibold rounded-lg px-6 py-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleSave}
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default CustomerList;
