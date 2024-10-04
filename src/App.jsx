import { useForm } from "react-hook-form";


function App() {

  const {register, handleSubmit, 
    formState: {errors},
    watch,
    setValue,
    reset
  } = useForm()


  const onSubmit = handleSubmit((data) =>{
    console.log(data)
    alert("Datos enviados...")
    reset()
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* nombre */}
      <label
        htmlFor="nombre">
        Nombre
      </label>
      <input type="text" 
      {...register("name", {
        required: {
          value: true,
          message: "Nombre es requerido"
        },
        minLength: {
          value: 2,
          message: "Nombre debe tener al menos 2 caracteres"
        },
        maxLength: {
          value: 20,
          message: "Nombre debe tener maximo 20 caracteres"
        }
      })} />
      {
        errors.name  && <span>{errors.name.message}</span>
      }

      {/* correo */}
      <label
        htmlFor="email">
        Correo
      </label>
      <input type="email" 
      {...register("email",{
        required: {
          value: true,
          message: "Email es requerido"
        },
        pattern: {
          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          message: "El correo no es valido"
        }
      })}
      />
      {
        errors.email  && <span>{errors.email.message}</span>
      }

      {/* password */}
      <label
        htmlFor="password">
        Contraseña
      </label>
      <input type="password" 
      {...register("password", {
        required: {
          value: true,
          message: "Contraseña es requerida"
        },
        minLength: {
          value: 6,
          message: "Contraseña debe tener al menos 2 caracteres"
        },
      })}
      />
      {
        errors.password  && <span>{errors.password.message}</span>
      }

      {/* confirm password */}
      <label
        htmlFor="confirmPassword">
        Confirmar Contraseña
      </label>
      <input type="password" 
      {...register("confirmPassword", {
        required: {
          value: true,
          message: "Confirmar la contraseña es requerida"
        },
        validate: (value) => {
            return value === watch("password") || "Las contraseñas no coinciden"
        }
      })}
      />
      {
        errors.confirmPassword  && <span>{errors.confirmPassword.message}</span>
      }


      {/* Fecha de Nacimiento */}
      <label
        htmlFor="dateBith">
        Fecha de nacimiento
      </label>
      <input type="date" 
      {...register("date", {
        required: {
          value: true,
          message: "la Fecha de nacimiento es requerida"
        },
        validate: (value) => {
          const dateBith = new Date(value)
          const dateNow = new Date()
          const age = dateBith.getFullYear()-dateNow.getFullYear()

          return age <= 18 || "Fecha de nacimiento no valida"
        }
      })}
      />
      {
        errors.date  && <span>{errors.date.message}</span>
      }


      {/* pais */}
      <label
        htmlFor="country">
        Pais
      </label>
      <select
      {...register("country", {
        required: {
          value: true,
          message: "El pais es obligatorio"
        }
      })}
      >
        <option value="mx">Mexico</option>
        <option value="co">Colombia</option>
        <option value="ar">Argentina</option>
        <option value="ec">Ecuador</option>
      </select>

      {/* archivo */}
      <label
        htmlFor="file">
        Archivo
      </label>
      <input type="file"  onChange={(e) => {
        console.log(e.target.files[0])
        setValue('userPhoto', e.target.files[0])
      }}
      />


      {/* terminos */}
      <label
        htmlFor="terms">
        Acepto Terminos y condiciones
      </label>
      <input type="checkbox" 
      {...register("terms", {
        required: {
          value: true,
          message: "Debes aceptar teérminos y condiciones"
        }
      })}
      />


      <button type="submit">
        Enviar
      </button>

      <pre>
        {JSON.stringify(watch(), null, 2)}
      </pre>
    </form>
  )
}


export default App;