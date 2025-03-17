<script>
export default {
  data() {
    return {
      nombre: "",
      correo: "",
    };
  },
  async mounted() {
    this.submitForm = async () => {
      if (!this.nombre || !this.correo) {
        console.error("Faltan datos para enviar");
        return;
      }

      try {
        const response = await this.$axios.post(
          "/api/data",
          { nombre: this.nombre, correo: this.correo },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("Usuario agregado:", response.data);
      } catch (error) {
        console.error("Error al agregar usuario:", error.response?.data || error);
      }
    };
  },
};
</script>

<template>
    <div class="container">
      <div class="form-box">
        <h2>Agregar Usuario</h2>
        <form @submit.prevent="submitForm">
          <div class="input-group">
            <input v-model="nombre" type="text" placeholder="Nombre" required />
          </div>
          <div class="input-group">
            <input v-model="correo" type="email" placeholder="Correo" required />
          </div>
          <button type="submit">Agregar Usuario</button>
        </form>
      </div>
    </div>
  </template>
  
<style>
  /* Fondo con degradado y tamaño completo */
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Ocupa toda la pantalla */
    width: 100vw; /* Asegura que ocupe todo el ancho */
    background: linear-gradient(135deg, #667eea, #764ba2);
    animation: fadeIn 1s ease-in-out;
  }
  
  /* Caja del formulario centrada */
  .form-box {
    background: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px; /* Para que no sea demasiado ancho */
    text-align: center;
  }
  
  /* Título */
  .form-box h2 {
    margin-bottom: 20px;
    color: #333;
    font-size: 24px;
    font-weight: bold;
  }
  
  /* Grupo de inputs */
  .input-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  /* Campos de entrada */
  .input-group input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    text-align: center;
    transition: border 0.3s ease-in-out;
  }
  
  /* Efecto al enfocar */
  .input-group input:focus {
    border-color: #56ab2f;
    box-shadow: 0 0 5px rgba(86, 171, 47, 0.5);
    outline: none;
  }
  
  /* Botón principal */
  button {
    width: 100%;
    padding: 12px;
    background: #56ab2f;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease-in-out, transform 0.2s;
  }
  
  /* Hover en el botón */
  button:hover {
    background: #3e8e41;
    transform: scale(1.05);
  }
  </style>