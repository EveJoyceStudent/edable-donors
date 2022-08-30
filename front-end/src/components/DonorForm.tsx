import { useForm } from 'react-hook-form'

function DonorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data))
  })

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
              {...register('exampleRequired', { required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>

          <div>
            <input
              placeholder="Name"
              {...register('exampleRequired', { required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>

          <div>
            <input
              placeholder="Phone number"
              {...register('exampleRequired', { required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>

          <div>
            <input
              placeholder="Email address"
              {...register('exampleRequired', { required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>

          <div>
            <label htmlFor="donateAnon">Donate anonymously?</label>
            <input
              type="checkbox"
              value="yes"
              {...register('donateAnon')}
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
