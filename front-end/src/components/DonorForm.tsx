import { useForm } from 'react-hook-form'
import { doc, getDoc, addDoc, collection } from "firebase/firestore"
import { db } from '../config/firebase';


function DonorForm() {
  const {
    register,
    handleSubmit,
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
    <div>
      Your tax deductible contribution:
      <br />
      <button>$5</button>
      <button>$10</button>
      <button>$20</button>
      <br />
      OR
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <input
              placeholder="Enter an amount"
              {...register('paidAMT', { required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>

          <div>
            <input
              placeholder="Name"
              {...register('name', { required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>

          <div>
            <input
              placeholder="Phone number"
              {...register('phone', { required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>

          <div>
            <input
              placeholder="Email address"
              {...register('email', { required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>

          <div>
            <label htmlFor="donateAnon">Donate anonymously?</label>
            <input
              type="checkbox"
              value="yes"
              {...register('IsAnon')}
            />
          </div>

          <div>
            <label htmlFor="mailingList">Join our mailing list?</label>
            <input
              type="checkbox"
              value="yes"
              {...register('mailingList')}
            />
          </div>
          <input type="submit" />
          
        </div>
      </form>
    </div>
  )
  }

export default DonorForm
