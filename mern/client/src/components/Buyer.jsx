import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getApiUrl } from "../api";
export default function Buyer() {
  const [form, setForm] = useState({
    group_id: "",
    buyer: {
      last_name: "",
      first_name: "",
      middle_name: "",
      person_entity: "",
      tin_no: "",
      email: "",
      phone: "",
      id: { 
        type: "",
        number: "",
        img_front: "",
        img_back: ""
      }
    },
    spouse: {
      last_name: "",
      first_name: "",
      middle_name: "",
      person_entity: "",
      tin_no: "",
      email: "",
      phone: "",
      id: { 
        type: "",
        number: "",
        img_front: "",
        img_back: ""
      }
    },
    address: {
      address1: "",
      address2: "",
      region: "",
      province: "",
      city: "",
      barangay: "",
      zip: "",
    },
    bank: {
      name: "",
      branch: "",
      phone: "",
      account_name: "",
      account_no: "",
    }
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(getApiUrl(`/Buyers/${params.id.toString()}`));
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
 /*
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
*/
  const updateForm = (path, value) => {
    setForm((prevForm) => {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const nestedObject = keys.reduce((obj, key) => obj[key], prevForm);

      return {
        ...prevForm,
        [keys[0]]: {
          ...nestedObject,
          [lastKey]: value
        }
      };
    });
  };

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    // alert(JSON.stringify(person));
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /record.
        response = await fetch(getApiUrl('/Buyers'), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        // if we are updating a record we will PATCH to /record/:id.
        response = await fetch(getApiUrl(`/Buyers/${params.id}`), {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred adding or updating a record: ', error);
    } finally {
      setForm({
        group_id: "",
        buyer: {
          last_name: "",
          first_name: "",
          middle_name: "",
          person_entity: "",
          tin_no: "",
          email: "",
          phone: "",
          id: { 
            type: "",
            number: "",
            img_front: "",
            imb_back: ""
          }
        },
        spouse: {
          last_name: "",
          first_name: "",
          middle_name: "",
          person_entity: "",
          tin_no: "",
          email: "",
          phone: "",
          id: { 
            type: "",
            number: "",
            img_front: "",
            imb_back: ""
          }
        },        
        address: {
          address1: "",
          address2: "",
          region: "",
          province: "",
          city: "",
          barangay: "",
          zip: "",
        },
        bank: {
          name: "",
          branch: "",
          phone: "",
          account_name: "",
          account_no: "",
        }
      });
      navigate("/BuyerList");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Buyer Record</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-2"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">

            <div>
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
                      value={form.buyer.first_name}
                      onChange={(e) => updateForm('buyer.first_name', e.target.value )}
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
                      value={form.buyer.middle_name}
                      onChange={(e) => updateForm('buyer.middle_name', e.target.value )}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="last_name"
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
                      placeholder="Last Name"
                      value={form.buyer.last_name}
                      onChange={(e) => updateForm('buyer.last_name', e.target.value )}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="person_entity"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Person / Entity
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="person_entity"
                      id="person_entity"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Person or Entity"
                      value={form.buyer.person_entity}
                      onChange={(e) => updateForm('buyer.person_entity', e.target.value )}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="tin_no"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  TIN Number
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="tin_no"
                      id="tin_no"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="TIN Number"
                      value={form.buyer.tin_no}
                      onChange={(e) => updateForm('buyer.tin_no', e.target.value )}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Email"
                      value={form.buyer.email}
                      onChange={(e) => updateForm('buyer.email', e.target.value )}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="phone_number"
                      id="phone_number"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Phone Number (e.g. 09171234567)"
                      value={form.buyer.phone}
                      onChange={(e) => updateForm('buyer.phone', e.target.value )}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="address1"
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
                      onChange={(e) => updateForm('address.address1', e.target.value )}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
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
                      onChange={(e) => updateForm('address.address2', e.target.value )}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
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
                      placeholder="Region (i.e. NCR, CAR, etc.)"
                      value={form.address.region}
                      onChange={(e) => updateForm('address.region', e.target.value )}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
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
                      placeholder="Province (i.e. Cebu, Batangas, etc.)"
                      value={form.address.province}
                      onChange={(e) => updateForm('address.province', e.target.value )}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
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
                      id="city"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="City (i.e. Manila, Cebu City, etc.)"
                      value={form.address.city}
                      onChange={(e) => updateForm('address.city', e.target.value )}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
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
                      placeholder="Barangay (i.e. San Antonio, Apas, etc.)"
                      value={form.address.barangay}
                      onChange={(e) => updateForm('address.barangay', e.target.value )}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
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
                      placeholder="Zip Code (i.e. 6000, 1000, etc.)"
                      value={form.address.zip}
                      onChange={(e) => updateForm('address.zip', e.target.value )}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
        <input
          type="submit"
          value="Save Buyer Record"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}
