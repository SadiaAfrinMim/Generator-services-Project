import CustomerDetailsForm from "../inputField/CustomerDetailsForm";
import Modal from "../inputField/Modal";
import { Pencil } from "lucide-react";

export default function Sales() {
  
  const [editOpen, setEditOpen] = useState(false)
  const [editingRow, setEditingRow] = useState(null)

  const openEdit = (row) => {
    setEditingRow(row)
    setEditOpen(true)
  }

  const closeEdit = () => {
    setEditOpen(false)
    setEditingRow(null)
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">মিটার রিডিং তালিকা</h1>
        <div className="text-sm text-blue-600">
          ড্যাশবোর্ড / মিটার রিডিং তালিকা / অ্যাড নিউ
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input
            type="text"
            placeholder="মিটার নাম্বার"
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="গ্রাহক"
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="হিসাব নাম্বার"
            className="border rounded px-3 py-2"
          />
          <select className="border rounded px-3 py-2">
            <option>50</option>
            <option>100</option>
            <option>200</option>
          </select>
          <button className="border rounded px-3 py-2 flex justify-center">
            🔍
          </button>
        </div>
      </div>

      {/* Pagination info */}
      <div className="bg-white p-3 rounded shadow text-sm">
        Showing 1 - 10 of 51733
      </div>

      {/* Pagination */}
      <div className="flex gap-1 flex-wrap text-sm">
        <button className="px-2 py-1 border rounded">‹</button>
        {[1,2,3,4,5,6,7,8,9,10].map(n => (
          <button
            key={n}
            className={`px-3 py-1 border rounded ${
              n === 1 ? "bg-blue-600 text-white" : ""
            }`}
          >
            {n}
          </button>
        ))}
        <span className="px-2">...</span>
        <button className="px-3 py-1 border rounded">5173</button>
        <button className="px-3 py-1 border rounded">5174</button>
        <button className="px-2 py-1 border rounded">›</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">তারিখ</th>
              <th className="p-2 text-left">মিটার নাম্বার</th>
              <th className="p-2 text-left">গ্রাহক</th>
              <th className="p-2 text-left">হিসাব নাম্বার</th>
              <th className="p-2 text-left">পূর্বের রিডিং</th>
              <th className="p-2 text-left">বর্তমান রিডিং</th>
              <th className="p-2 text-left">রিডিং পার্থক্য</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">27/12/2025</td>
              <td className="p-2">691308</td>
              <td className="p-2">
                শিপন সরকার ৪র্থ<br/>
                <span className="text-blue-500 text-xs">01740-641165</span>
              </td>
              <td className="p-2">25124</td>
              <td className="p-2">16</td>
              <td className="p-2">19</td>
              <td className="p-2">3</td>
              <td className="p-2 flex gap-2">
                👁️ ✏️
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2">27/12/2025</td>
              <td className="p-2">89542</td>
              <td className="p-2">
                মধুসূদন সাহা<br/>
                <span className="text-blue-500 text-xs">01712-269047</span>
              </td>
              <td className="p-2">11086</td>
              <td className="p-2">2375</td>
              <td className="p-2">2379</td>
              <td className="p-2">4</td>
              <td className="p-2 flex gap-2">
                👁️  <button
                            className="text-blue-600 hover:text-blue-700"
                            title="Edit"
                            onClick={() => openEdit(c)}
                          >
                            <Pencil className="h-5 w-5" />
                          </button>
              </td>
            </tr>
          </tbody>
        </table>
        <Modal open={editOpen} onClose={closeEdit} title="গ্রাহকের বিস্তারিত (Edit)">
          <CustomerDetailsForm initialData={editingRow} onClose={closeEdit} />
        </Modal>
      </div>
    </div>
    
  )
}
