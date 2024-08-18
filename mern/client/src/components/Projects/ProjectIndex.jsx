import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getApiUrl } from "../../api";

const ProjectItem = ({record, deleteRecord}) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {record.company_id}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {record.project_id}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {record.name}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {record.address.address1} 
      {record.address.address2} 
      {record.address.region}
      {record.address.province}
      {record.address.city}
      {record.address.barangay}
      {record.address.zip}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {record.landmark}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/projects/edit/${record._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            deleteRecord(record._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function ProjectIndex() {
  const [records, setProjects] = useState([]);
  const isNew = true;

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(getApiUrl('/projects'));
      if (!response.ok) {
        const message = `An error occurred: Project Index ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setProjects(records);
    }
    getRecords();
    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(getApiUrl(`/projects/${id}`), {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setProjects(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <ProjectItem
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  function updateForm(value) {
    return setProjects((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const project = { ...records };
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /record.
        response = await fetch(getApiUrl('/projects'), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        });
      } else {
        // if we are updating a record we will PATCH to /record/:id.
        response = await fetch(getApiUrl(`/project/${params.id}`), {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred adding or updating a record: ', error);
    } finally {
    //   setForm({ name: "", position: "", level: "" });
      navigate("/projects");
    }
  }

  // This following section will display the table with the records of individuals.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Project Records</h3>
      <div className="float-end w-full">
      {/* <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      > */}
      {/* <input
          type="submit"
          value="Add Project Record"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        /> */}
        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 float-end mb-6" 
            to="/projects/add">
          Add Project
        </NavLink>
        {/* </form> */}
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Project #
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Company
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Address
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Landmark
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              {recordList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
