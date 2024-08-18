import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectSchema from "./projectSchema";
import { getApiUrl } from "../../api";

export default function ProjectAddEdit() {
  const [form, setForm] = useState(projectSchema);
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(getApiUrl("/projects/" + params.id.toString()));
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const project = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /record.
        response = await fetch( getApiUrl("/projects"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        });
      } else {
        // if we are updating a record we will PATCH to /record/:id.
        response = await fetch(getApiUrl("/projects/" + params.id) , {
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

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Project Record</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2 p-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Project Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">

          <div className="sm:col-span-4">
              <label
                htmlFor="project_id"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Project Id
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="project_id"
                    id="project_id"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Project ID"
                    value={form.project_id}
                    required
                    onChange={(e) => updateForm({ project_id: e.target.value })}
                  />
                </div>
              </div>
            </div>


            <div className="sm:col-span-4">
              <label
                htmlFor="company_id"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Company
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="company_id"
                    id="company_id"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Company Name"
                    value={form.company_id}
                    required
                    onChange={(e) => updateForm({ company_id: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Project Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Project Name"
                    value={form.name}
                    required
                    onChange={(e) => updateForm({ name: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2 p-2">
            <div>
                <h2 className="text-base font-semibold leading-7 text-slate-900">
                Address Info
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                </p>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            
            <div className="sm:col-span-4">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Address 1
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="address1"
                    id="address1"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Address 1"
                    value={form.address.address1}
                    required
                    onChange={(e) => updateForm({ address: {...form.address, address1 : e.target.value} })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="address2"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Address 2
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="address2"
                    id="address2"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Address 2"
                    value={form.address.address2}
                    required
                    onChange={(e) => updateForm({ address: {...form.address , address2: e.target.value} })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Region
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Region"
                    value={form.address.region}
                    required
                    onChange={(e) => updateForm({ address: {...form.address , region: e.target.value} })}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="province"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Province
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="province"
                    id="province"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Province"
                    value={form.address.province}
                    required
                    onChange={(e) => updateForm({ address: {...form.address , province: e.target.value} })}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                City
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="city"
                    id="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="City"
                    value={form.address.city}
                    required
                    onChange={(e) => updateForm({ address: {...form.address , city: e.target.value} })}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="barangay"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Barangay
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="barangay"
                    id="barangay"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Barangay"
                    value={form.address.barangay}
                    required
                    onChange={(e) => updateForm({ address: {...form.address , barangay: e.target.value} })}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="zip"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Zip
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="zip"
                    id="zip"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Zip"
                    value={form.address.zip}
                    required
                    onChange={(e) => updateForm({ address: {...form.address , zip: e.target.value} })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2 p-2">
            <div>
                <h2 className="text-base font-semibold leading-7 text-slate-900">
                Land Mark and Coordinates
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                </p>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
              <div className="sm:col-span-4">
                <label
                  htmlFor="landmark"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Landmark
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="landmark"
                      id="landmark"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Landmark"
                      value={form.landmark}
                      required
                      onChange={(e) => updateForm({ landmark: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="latitude"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Latitude
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="latitude"
                      id="latitude"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Latitude"
                      value={form.coordinates.latitude}
                      required
                      onChange={(e) => updateForm({ coordinates: { ...form.coordinates, latitude : e.target.value} })}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="longitude"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Longitude
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="longitude"
                      id="longitude"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="longitude"
                      value={form.coordinates.longitude}
                      required
                      onChange={(e) => updateForm({ coordinates : { ...form.coordinates, longitude: e.target.value} })}
                    />
                  </div>
                </div>
              </div>

          </div>
        </div>


        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2 p-2">
            <div>
                <h2 className="text-base font-semibold leading-7 text-slate-900">
                Owner Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                </p>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
              <div className="sm:col-span-4">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="First Name"
                      value={form.original_owner.first_name}
                      required
                      onChange={(e) => updateForm({ original_owner: { ...form.original_owner, first_name : e.target.value} })}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="latitude"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Last_name"
                      value={form.original_owner.last_name}
                      required
                      onChange={(e) => updateForm({ original_owner: { ...form.original_owner, last_name : e.target.value} })}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="middle_name"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Middle Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="middle_name"
                      id="middle_name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Middle Name"
                      value={form.original_owner.middle_name}
                      required
                      onChange={(e) => updateForm({ original_owner : { ...form.original_owner, middle_name: e.target.value} })}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Email Address"
                      value={form.original_owner.email}
                      required
                      onChange={(e) => updateForm({ original_owner : { ...form.original_owner, email: e.target.value} })}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Phone Number"
                      value={form.original_owner.phone}
                      required
                      onChange={(e) => updateForm({ original_owner : { ...form.original_owner, phone: e.target.value} })}
                    />
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2 p-2">
            <div>
                <h2 className="text-base font-semibold leading-7 text-slate-900">
                
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
            
                </p>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
                <input
                type="submit"
                value="Save Project Record"
                className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
                />
            </div>
          </div>
      </form>
    </>
  );
}
