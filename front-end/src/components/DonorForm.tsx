import { useForm } from 'react-hook-form'
import { doc, getDoc, addDoc, collection } from "firebase/firestore"
import { db } from '../config/firebase';


import '../styling/DonorForm.css'

function DonorForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const currentLoc = window.location.pathname;
  const splitOrg = currentLoc.slice(14)

  console.log(splitOrg);

  const onSubmit = handleSubmit(async (data) => {
      try{
        const orgRef = await addDoc(collection(db, `Organisations/${splitOrg}/GeneralDonations/`),
        {
          data,
        }
        );
        console.log("it works", data)
      } catch(e){
        console.log('error')
        
    }
  });

  return (
    //   these lines set up the format of the page
    <div id="donorInfoContainer">
      <p>Your tax deductible contribution:</p>
      <br />
      <div id="presetButtons">
        <div>
          <button
            type="button"
            onClick={() => {
              setValue('amount', '5')
            }}
          >
            $5
          </button>
          <button
            type="button"
            onClick={() => {
              setValue('amount', '10')
            }}
          >
            $10
          </button>
          <button
            type="button"
            onClick={() => {
              setValue('amount', '20')
            }}
          >
            $20
          </button>
        </div>
      </div>
      <br />
      OR
      <form onSubmit={onSubmit}>
        <div>
          <div>
          {errors.amount && <span>*</span>}<label>Enter an amount</label>
            <input
              placeholder="Enter an amount"
              {...register('paidAMT', { required: true })}
            />

          </div>

          <div>
            <label htmlFor="monthlyPayment">
              Let's make this a monthly payment!
            </label>
            <input type="checkbox" value="yes" {...register('monthly')} />
          </div>

          <br />

          <div>
          {errors.name && <span>*</span>}<label>Name</label>
            <input
              placeholder="Name"
              {...register('name', { required: true })}
            />
          </div>

          <div>
          {errors.phone && <span>*</span>}<label>Phone</label>
            <input
              type="tel"
              placeholder="04XX XXX XXX"
              {...register('phone', {
                required: true,
                maxLength: 10,
                minLength: 10,
                pattern: /^[0-9]$/,
              })}
            />
          </div>

          <div>
          {errors.email && <span>*</span>}<label>Email</label>
            <input
              type="email"
              placeholder="Email address"
              {...register('email', { required: true })}
            />
          </div>

          <div>
            <label htmlFor="donateAnon">Donate anonymously?</label>
            <input type="checkbox" value="yes" {...register('IsAnon')} />
          </div>

          <div>
            <label htmlFor="mailingList">Join our mailing list?</label>
            <input type="checkbox" value="yes" {...register('mailingList')} />
          </div>

          <input type="submit" />
          
        </div>
      </form>
    </div>
  )
  }

export default DonorForm

// submit button to direct to THANK U page
// validation for ENTER AMOUNT & PHONE (int)
