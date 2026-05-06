document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // OCULTAR MIENTRAS REVISA SESION
  // =========================
  document.body.style.visibility = "hidden";

  function mostrarBody() {
    document.body.style.visibility = "visible";
  }

  // =========================
  // SUPABASE
  // =========================
  const SUPABASE_URL = "https://ekxchwqhdovufwoqxszh.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_RMAdj7ndWYfGSk1H29orHA_o1UveTir";

  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );


  // =========================
  // ACCESO DIRECTO ADMIN POR URL
  // =========================
  // Enlace directo para saltar la fachada y mostrar el login real:
  // https://velvetintime.github.io/?admin=1
  const ACCESO_ADMIN_DIRECTO =
    new URLSearchParams(window.location.search).get("admin") === "1";

  function activarAccesoAdminDirecto() {
    if (!ACCESO_ADMIN_DIRECTO) return;

    // Si existe una fachada en el HTML integrado, la ocultamos.
    [
      "storeScreen",
      "fachadaScreen",
      "pantallaFachada",
      "fachada",
      "tienda",
      "velvetStore"
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.style.setProperty("display", "none", "important");
        el.setAttribute("aria-hidden", "true");
      }
    });

    document
      .querySelectorAll(".fachada, .pantalla-fachada, .store-screen, .velvet-store")
      .forEach((el) => {
        el.style.setProperty("display", "none", "important");
        el.setAttribute("aria-hidden", "true");
      });

    // Si el sistema SUTRAN fue envuelto para ocultarlo detrás de la fachada,
    // lo mostramos para que el login real funcione directo.
    const sistemaSUTRAN = document.getElementById("sistemaSUTRAN");
    if (sistemaSUTRAN) {
      sistemaSUTRAN.style.setProperty("display", "block", "important");
      sistemaSUTRAN.removeAttribute("aria-hidden");
    }

    document.body.classList.add("acceso-admin-directo");
  }

  activarAccesoAdminDirecto();

  // =========================
  // LOGIN
  // =========================
  const pantallaLogin = document.getElementById("pantallaLogin");
  const appReal = document.getElementById("appReal");
  const usuarioLogin = document.getElementById("usuarioLogin");
  const claveLogin = document.getElementById("claveLogin");
  const btnIngresar = document.getElementById("btnIngresar");
  const btnAbrirSolicitud = document.getElementById("btnAbrirSolicitud");
  const mensajeLogin = document.getElementById("mensajeLogin");
  const modalSolicitudAcceso = document.getElementById("modalSolicitudAcceso");
  const cerrarModalSolicitudBackdrop = document.getElementById("cerrarModalSolicitudBackdrop");
  const btnCancelarSolicitud = document.getElementById("btnCancelarSolicitud");
  const btnEnviarSolicitud = document.getElementById("btnEnviarSolicitud");
  const usuarioSolicitud = document.getElementById("usuarioSolicitud");
  const claveSolicitud = document.getElementById("claveSolicitud");
  const nombreCompletoSolicitud = document.getElementById("nombreCompletoSolicitud");
  const mensajeSolicitud = document.getElementById("mensajeSolicitud");
  const accionesSolicitudExito = document.getElementById("accionesSolicitudExito");
  const btnEntendidoSolicitud = document.getElementById("btnEntendidoSolicitud");
  const usuarioActivo = document.getElementById("usuarioActivo");
  const cerrarSesion = document.getElementById("cerrarSesion");
  const menuAdmin = document.getElementById("menuAdmin");
  const btnMenuRegistro = document.getElementById("btnMenuRegistro");
  const btnMenuHistorial = document.getElementById("btnMenuHistorial");
  const btnMenuUsuarios = document.getElementById("btnMenuUsuarios");
  const btnMenuActividad = document.getElementById("btnMenuActividad");
  const seccionRegistro = document.getElementById("seccionRegistro");
  const btnVolverMenuDesdeRegistro = document.getElementById("btnVolverMenuDesdeRegistro");
  const btnVolverMenuDesdeHistorial = document.getElementById("btnVolverMenuDesdeHistorial");
  const btnVolverMenuDesdeUsuarios = document.getElementById("btnVolverMenuDesdeUsuarios");
  const btnVolverMenuDesdeActividad = document.getElementById("btnVolverMenuDesdeActividad");
  const envolturaBotonVolverRegistro = document.getElementById("envolturaBotonVolverRegistro");
  const envolturaBotonVolverHistorial = document.getElementById("envolturaBotonVolverHistorial");
  const envolturaBotonVolverUsuarios = document.getElementById("envolturaBotonVolverUsuarios");
  const envolturaBotonVolverActividad = document.getElementById("envolturaBotonVolverActividad");

  // =========================
  // OJO CONTRASENA
  // =========================
  const toggleClave = document.getElementById("toggleClave");
  const iconoOjoAbierto = document.getElementById("iconoOjoAbierto");
  const iconoOjoCerrado = document.getElementById("iconoOjoCerrado");

  // =========================
  // PANEL ADMIN HISTORIAL
  // =========================
  const panelAdmin = document.getElementById("panelAdmin");
  const historialAdmin = document.getElementById("historialAdmin");
  const btnRecargarHistorial = document.getElementById("btnRecargarHistorial");
  const paginacionAdmin = document.getElementById("paginacionAdmin");
  const btnPaginaAnterior = document.getElementById("btnPaginaAnterior");
  const btnPaginaSiguiente = document.getElementById("btnPaginaSiguiente");
  const infoPaginaAdmin = document.getElementById("infoPaginaAdmin");

  // =========================
  // FILTROS ADMIN HISTORIAL
  // =========================
  const filtroUsuarioAdmin = document.getElementById("filtroUsuarioAdmin");
  const filtroFechaDesdeAdmin = document.getElementById("filtroFechaDesdeAdmin");
  const filtroFechaHastaAdmin = document.getElementById("filtroFechaHastaAdmin");
  const btnLimpiarFiltrosAdmin = document.getElementById("btnLimpiarFiltrosAdmin");

  // Compatibilidad por si existe el input antiguo
  const filtroFechaAdmin = document.getElementById("filtroFechaAdmin");

  // =========================
  // PANEL ADMIN USUARIOS
  // =========================
  const panelUsuariosAdmin = document.getElementById("panelUsuariosAdmin");
  const btnRecargarUsuariosAdmin = document.getElementById("btnRecargarUsuariosAdmin");
  const filtroUsuarioPanelAdmin = document.getElementById("filtroUsuarioPanelAdmin");
  const btnLimpiarUsuariosAdmin = document.getElementById("btnLimpiarUsuariosAdmin");
  const resumenUsuariosAdmin = document.getElementById("resumenUsuariosAdmin");
  const listaUsuariosAdmin = document.getElementById("listaUsuariosAdmin");
  let paginacionUsuariosAdmin = document.getElementById("paginacionUsuariosAdmin");
  let btnPaginaAnteriorUsuarios = document.getElementById("btnPaginaAnteriorUsuarios");
  let btnPaginaSiguienteUsuarios = document.getElementById("btnPaginaSiguienteUsuarios");
  let infoPaginaUsuariosAdmin = document.getElementById("infoPaginaUsuariosAdmin");
  const btnRecargarSolicitudesAdmin = document.getElementById("btnRecargarSolicitudesAdmin");
  const resumenSolicitudesAdmin = document.getElementById("resumenSolicitudesAdmin");
  const listaSolicitudesAdmin = document.getElementById("listaSolicitudesAdmin");

  const panelActividadAdmin = document.getElementById("panelActividadAdmin");
  const btnRecargarActividadAdmin = document.getElementById("btnRecargarActividadAdmin");
  const resumenActividadAdmin = document.getElementById("resumenActividadAdmin");
  const listaActividadAdmin = document.getElementById("listaActividadAdmin");
  let filtroFechaDesdeActividadAdmin = document.getElementById("filtroFechaDesdeActividadAdmin");
  let filtroFechaHastaActividadAdmin = document.getElementById("filtroFechaHastaActividadAdmin");
  let btnLimpiarActividadAdmin = document.getElementById("btnLimpiarActividadAdmin");

  const btnMenuClaves = document.getElementById("btnMenuClaves");
  const panelClavesAdmin = document.getElementById("panelClavesAdmin");
  const btnVolverMenuDesdeClaves = document.getElementById("btnVolverMenuDesdeClaves");
  const envolturaBotonVolverClaves = document.getElementById("envolturaBotonVolverClaves");
  const btnAbrirCambioClaveAdmin = document.getElementById("btnAbrirCambioClaveAdmin");
  const btnRecargarClavesAdmin = document.getElementById("btnRecargarClavesAdmin");
  const listaClavesAdmin = document.getElementById("listaClavesAdmin");
  const modalCambioClaveAdmin = document.getElementById("modalCambioClaveAdmin");
  const cerrarModalCambioClaveBackdrop = document.getElementById("cerrarModalCambioClaveBackdrop");
  const btnCancelarCambioClaveAdmin = document.getElementById("btnCancelarCambioClaveAdmin");
  const btnGuardarCambioClaveAdmin = document.getElementById("btnGuardarCambioClaveAdmin");
  const nuevaClaveAdmin = document.getElementById("nuevaClaveAdmin");
  const confirmarClaveAdmin = document.getElementById("confirmarClaveAdmin");
  const mensajeCambioClaveAdmin = document.getElementById("mensajeCambioClaveAdmin");

  // =========================
  // RESUMEN HISTORIAL
  // =========================
  let resumenHistorialAdmin = document.getElementById("resumenHistorialAdmin");

  if (!resumenHistorialAdmin && panelAdmin && historialAdmin) {
    resumenHistorialAdmin = document.createElement("div");
    resumenHistorialAdmin.id = "resumenHistorialAdmin";
    resumenHistorialAdmin.style.marginBottom = "12px";
    resumenHistorialAdmin.style.padding = "10px 12px";
    resumenHistorialAdmin.style.border = "1px solid #d9d9d9";
    resumenHistorialAdmin.style.borderRadius = "10px";
    resumenHistorialAdmin.style.background = "#f7f9fc";
    resumenHistorialAdmin.style.fontSize = "14px";
    resumenHistorialAdmin.style.fontWeight = "700";
    resumenHistorialAdmin.style.color = "#1f2d3d";
    resumenHistorialAdmin.textContent = "Mostrando 0 de 0 registros";
    panelAdmin.insertBefore(resumenHistorialAdmin, historialAdmin);
  }

  if (!paginacionUsuariosAdmin && panelUsuariosAdmin && listaUsuariosAdmin) {
    paginacionUsuariosAdmin = document.createElement("div");
    paginacionUsuariosAdmin.id = "paginacionUsuariosAdmin";
    paginacionUsuariosAdmin.style.display = "none";
    paginacionUsuariosAdmin.style.marginTop = "14px";
    paginacionUsuariosAdmin.style.gap = "10px";
    paginacionUsuariosAdmin.style.alignItems = "center";
    paginacionUsuariosAdmin.style.justifyContent = "center";
    paginacionUsuariosAdmin.style.flexWrap = "wrap";

    btnPaginaAnteriorUsuarios = document.createElement("button");
    btnPaginaAnteriorUsuarios.id = "btnPaginaAnteriorUsuarios";
    btnPaginaAnteriorUsuarios.type = "button";
    btnPaginaAnteriorUsuarios.textContent = "Anterior";
    btnPaginaAnteriorUsuarios.style.background = "#4b79bb";
    btnPaginaAnteriorUsuarios.style.color = "#fff";
    btnPaginaAnteriorUsuarios.style.border = "none";
    btnPaginaAnteriorUsuarios.style.borderRadius = "8px";
    btnPaginaAnteriorUsuarios.style.padding = "10px 14px";
    btnPaginaAnteriorUsuarios.style.cursor = "pointer";

    infoPaginaUsuariosAdmin = document.createElement("span");
    infoPaginaUsuariosAdmin.id = "infoPaginaUsuariosAdmin";
    infoPaginaUsuariosAdmin.style.fontWeight = "700";
    infoPaginaUsuariosAdmin.style.fontSize = "14px";
    infoPaginaUsuariosAdmin.textContent = "Pagina 1 de 1";

    btnPaginaSiguienteUsuarios = document.createElement("button");
    btnPaginaSiguienteUsuarios.id = "btnPaginaSiguienteUsuarios";
    btnPaginaSiguienteUsuarios.type = "button";
    btnPaginaSiguienteUsuarios.textContent = "Siguiente";
    btnPaginaSiguienteUsuarios.style.background = "#4b79bb";
    btnPaginaSiguienteUsuarios.style.color = "#fff";
    btnPaginaSiguienteUsuarios.style.border = "none";
    btnPaginaSiguienteUsuarios.style.borderRadius = "8px";
    btnPaginaSiguienteUsuarios.style.padding = "10px 14px";
    btnPaginaSiguienteUsuarios.style.cursor = "pointer";

    paginacionUsuariosAdmin.appendChild(btnPaginaAnteriorUsuarios);
    paginacionUsuariosAdmin.appendChild(infoPaginaUsuariosAdmin);
    paginacionUsuariosAdmin.appendChild(btnPaginaSiguienteUsuarios);
    panelUsuariosAdmin.appendChild(paginacionUsuariosAdmin);
  }

  if (panelActividadAdmin && !filtroFechaDesdeActividadAdmin && btnRecargarActividadAdmin && resumenActividadAdmin) {
    const contenedorFiltros = document.createElement("div");
    contenedorFiltros.id = "filtrosActividadAdmin";
    contenedorFiltros.style.display = "grid";
    contenedorFiltros.style.gridTemplateColumns = "1fr 1fr";
    contenedorFiltros.style.gap = "10px";
    contenedorFiltros.style.marginBottom = "14px";

    const wrapDesde = document.createElement("div");
    wrapDesde.className = "campo";
    wrapDesde.style.margin = "0";
    wrapDesde.innerHTML = `
      <label for="filtroFechaDesdeActividadAdmin">Fecha desde</label>
      <div class="input-icono input-select">
        <input type="date" id="filtroFechaDesdeActividadAdmin">
      </div>
    `;

    const wrapHasta = document.createElement("div");
    wrapHasta.className = "campo";
    wrapHasta.style.margin = "0";
    wrapHasta.innerHTML = `
      <label for="filtroFechaHastaActividadAdmin">Fecha hasta</label>
      <div class="input-icono input-select">
        <input type="date" id="filtroFechaHastaActividadAdmin">
      </div>
    `;

    const wrapBoton = document.createElement("div");
    wrapBoton.className = "campo";
    wrapBoton.style.margin = "0";
    wrapBoton.style.gridColumn = "1 / -1";
    wrapBoton.innerHTML = '<button id="btnLimpiarActividadAdmin" type="button" style="width:100%; background:#eef3fb; color:#315b98; border:1px solid #cfdced; box-shadow:none;">Limpiar filtro de fechas</button>';

    contenedorFiltros.appendChild(wrapDesde);
    contenedorFiltros.appendChild(wrapHasta);
    contenedorFiltros.appendChild(wrapBoton);

    btnRecargarActividadAdmin.insertAdjacentElement("afterend", contenedorFiltros);

    filtroFechaDesdeActividadAdmin = document.getElementById("filtroFechaDesdeActividadAdmin");
    filtroFechaHastaActividadAdmin = document.getElementById("filtroFechaHastaActividadAdmin");
    btnLimpiarActividadAdmin = document.getElementById("btnLimpiarActividadAdmin");
  }

  // =========================
  // CIERRE AUTOMATICO FIJO
  // =========================
  const DURACION_SESION_MS = 5 * 60 * 1000;
  let temporizadorSesion = null;

  // =========================
  // ESTADO GLOBAL
  // =========================
  let perfilActual = null;
  let esAdminActual = false;
  let cargandoHistorialAdmin = false;
  let cargandoUsuariosAdmin = false;
  let cargandoSolicitudesAdmin = false;
  let cargandoActividadAdmin = false;

  // =========================
  // HISTORIAL CACHE
  // =========================
  const REGISTROS_POR_PAGINA = 5;
  let registrosAdminOriginalCache = [];
  let registrosAdminCache = [];
  let paginaActualAdmin = 1;

  // =========================
  // USUARIOS CACHE
  // =========================
  const USUARIOS_POR_PAGINA = 5;
  let usuariosAdminOriginalCache = [];
  let usuariosAdminCache = [];
  let paginaActualUsuariosAdmin = 1;
  let solicitudesAdminCache = [];
  let actividadAdminCache = [];
  let detalleActividadExpandidoUserId = null;
  let historialActividadCache = {};
  let ordenActividadDetalleCache = {};
  let resumenIntentosActividadCache = {};
  let clavesAdminCache = [];

  // =========================
  // INSTALACION / DISPOSITIVO
  // =========================
  const STORAGE_KEY_INSTALLATION_ID = "sutran_installation_id";

  function limpiarTemporizadorSesion() {
    if (temporizadorSesion) {
      clearTimeout(temporizadorSesion);
      temporizadorSesion = null;
    }
  }

  function normalizarUsuarioSolicitud(valor) {
    return String(valor || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "");
  }

  function limpiarFormularioSolicitud() {
    if (usuarioSolicitud) usuarioSolicitud.value = "";
    if (claveSolicitud) claveSolicitud.value = "";
    if (nombreCompletoSolicitud) nombreCompletoSolicitud.value = "";
    if (mensajeSolicitud) {
      mensajeSolicitud.textContent = "";
      mensajeSolicitud.classList.remove("mensaje-solicitud-exito");
      mensajeSolicitud.classList.remove("mensaje-solicitud-error");
    }
    if (btnEnviarSolicitud) {
      btnEnviarSolicitud.disabled = false;
      btnEnviarSolicitud.style.display = "";
    }
    if (btnCancelarSolicitud) {
      btnCancelarSolicitud.disabled = false;
      btnCancelarSolicitud.style.display = "";
      btnCancelarSolicitud.textContent = "Cancelar";
    }
    if (accionesSolicitudExito) accionesSolicitudExito.style.display = "none";
  }

  function abrirModalSolicitud() {
    if (!modalSolicitudAcceso) return;
    limpiarFormularioSolicitud();
    modalSolicitudAcceso.style.display = "flex";
    document.body.classList.add("modal-abierto");
    if (usuarioSolicitud) usuarioSolicitud.focus();
  }

  function cerrarModalSolicitud() {
    if (!modalSolicitudAcceso) return;
    modalSolicitudAcceso.style.display = "none";
    document.body.classList.remove("modal-abierto");
  }

  function actualizarResumenSolicitudes(totalSolicitudes) {
    if (!resumenSolicitudesAdmin) return;
    resumenSolicitudesAdmin.textContent = `Mostrando ${totalSolicitudes || 0} solicitudes`;
  }

  function actualizarResumenActividad(totalActividad) {
    if (resumenActividadAdmin) {
      resumenActividadAdmin.textContent = `Mostrando ${totalActividad || 0} registros de actividad`;
    }

    // Mantiene actualizado el resumen general, incluido "Último usuario".
    if (typeof actualizarResumenGeneralAdmin === "function") {
      actualizarResumenGeneralAdmin();
    }
  }

  function limpiarMensajeCambioClaveAdmin() {
    if (!mensajeCambioClaveAdmin) return;
    mensajeCambioClaveAdmin.textContent = "";
    mensajeCambioClaveAdmin.classList.remove("mensaje-solicitud-exito", "mensaje-solicitud-error");
  }

  function abrirModalCambioClaveAdmin() {
    if (!modalCambioClaveAdmin) return;
    if (nuevaClaveAdmin) nuevaClaveAdmin.value = "";
    if (confirmarClaveAdmin) confirmarClaveAdmin.value = "";
    limpiarMensajeCambioClaveAdmin();
    modalCambioClaveAdmin.style.display = "flex";
    document.body.classList.add("modal-abierto");
    if (nuevaClaveAdmin) nuevaClaveAdmin.focus();
  }

  function cerrarModalCambioClaveAdmin() {
    if (!modalCambioClaveAdmin) return;
    modalCambioClaveAdmin.style.display = "none";
    document.body.classList.remove("modal-abierto");
    if (nuevaClaveAdmin) nuevaClaveAdmin.value = "";
    if (confirmarClaveAdmin) confirmarClaveAdmin.value = "";
    limpiarMensajeCambioClaveAdmin();
    if (btnGuardarCambioClaveAdmin) btnGuardarCambioClaveAdmin.disabled = false;
  }

  function obtenerIconoOjoClaveSvg(visible = false) {
    return visible
      ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 4.27 3.28 3l17.72 17.73L19.73 22l-3.07-3.07A10.7 10.7 0 0 1 12 20C6.5 20 2.5 14.5 2.5 13c0-1.11 2.19-4.34 5.62-6.08L2 4.27zm9.5 11.23a3.48 3.48 0 0 0 3.41-2.77l-4.14-4.14A3.5 3.5 0 0 0 11.5 15.5zM12 6c5.5 0 9.5 5.5 9.5 7 0 .72-.94 2.26-2.55 3.77l-2.2-2.2c.16-.5.25-1.03.25-1.57a5 5 0 0 0-5-5c-.54 0-1.07.09-1.57.25L8.6 6.43A9.92 9.92 0 0 1 12 6z"/></svg>`
      : `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5c-5.5 0-9.5 5.5-9.5 7s4 7 9.5 7 9.5-5.5 9.5-7-4-7-9.5-7zm0 11a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm0-6.5A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5z"/></svg>`;
  }

  function construirHtmlClavesAdmin(lista) {
    if (!Array.isArray(lista) || !lista.length) {
      return "<p style='padding:10px;'>No hay claves registradas para mostrar</p>";
    }

    return lista.map((item) => {
      const esAdmin = String(item.rol || "").toLowerCase() === "admin";
      const claseTarjeta = esAdmin ? "tarjeta-clave-admin" : "tarjeta-clave-regular";
      const claseBadge = esAdmin ? "tarjeta-clave-badge-admin" : "tarjeta-clave-badge-usuario";
      const rolTexto = esAdmin ? "admin" : "usuario";
      const tieneClaveVisible = !!item.clave_visible;
      const valorClaveReal = tieneClaveVisible ? escaparHtml(item.clave_visible) : "";
      const valorClaveOculta = tieneClaveVisible ? "••••••••" : "Clave protegida";
      const ayuda = tieneClaveVisible
        ? "Clave mostrada desde la última solicitud registrada para este usuario."
        : "Clave protegida por seguridad. Solo se muestra cuando existe una solicitud registrada.";

      return `
        <div class="tarjeta-clave-usuario ${claseTarjeta}">
          <div class="tarjeta-clave-cabecera">
            <div class="tarjeta-clave-usuario-nombre">${escaparHtml(item.usuario || "-")}</div>
            <div class="tarjeta-clave-badge ${claseBadge}">${escaparHtml(rolTexto)}</div>
          </div>
          <div class="tarjeta-clave-label">Clave registrada</div>
          <div class="tarjeta-clave-campo ${tieneClaveVisible ? "tarjeta-clave-campo-con-boton" : ""}">
            <div
              class="tarjeta-clave-valor ${tieneClaveVisible ? "tarjeta-clave-valor-oculta" : ""}"
              data-clave-real="${valorClaveReal}"
              data-visible="false"
            >${valorClaveOculta}</div>
            ${tieneClaveVisible ? `
              <button
                type="button"
                class="btn-toggle-clave-admin"
                aria-label="Mostrar clave"
                aria-pressed="false"
                title="Mostrar clave"
              >
                ${obtenerIconoOjoClaveSvg(false)}
              </button>
              <button
                type="button"
                class="btn-copiar-clave-admin"
                aria-label="Copiar clave"
                title="Copiar clave"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/></svg>
              </button>
            ` : ""}
          </div>
          <div class="tarjeta-clave-ayuda">${escaparHtml(ayuda)}</div>
        </div>
      `;
    }).join("");
  }

  async function cargarClavesAdmin() {
    if (!esAdminActual) {
      if (listaClavesAdmin) listaClavesAdmin.innerHTML = "<p style='padding:10px;'>Solo el admin puede ver este modulo</p>";
      return;
    }

    if (!listaClavesAdmin) return;

    listaClavesAdmin.innerHTML = "<p style='padding:10px;'>Cargando claves...</p>";

    try {
      const [{ data: perfiles, error: errorPerfiles }, { data: solicitudes, error: errorSolicitudes }] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, usuario, rol")
          .order("usuario", { ascending: true }),
        supabase
          .from("solicitudes_acceso")
          .select("usuario, clave, created_at, updated_at")
          .order("updated_at", { ascending: false })
      ]);

      if (errorPerfiles) {
        console.error("Error cargando perfiles para claves:", errorPerfiles);
        listaClavesAdmin.innerHTML = "<p style='padding:10px;'>No se pudo cargar la lista de claves</p>";
        return;
      }

      const mapaSolicitudes = new Map();
      (solicitudes || []).forEach((solicitud) => {
        const usuarioNormalizado = normalizarUsuarioSolicitud(solicitud.usuario || "");
        if (!usuarioNormalizado) return;
        if (!mapaSolicitudes.has(usuarioNormalizado)) {
          mapaSolicitudes.set(usuarioNormalizado, solicitud);
        }
      });

      clavesAdminCache = (perfiles || []).map((perfil) => {
        const llave = normalizarUsuarioSolicitud(perfil.usuario || "");
        const solicitud = mapaSolicitudes.get(llave);
        return {
          usuario: perfil.usuario || "",
          rol: perfil.rol || "usuario",
          clave_visible: solicitud?.clave || ""
        };
      });

      listaClavesAdmin.innerHTML = construirHtmlClavesAdmin(clavesAdminCache);
    } catch (error) {
      console.error("Error general cargando claves:", error);
      listaClavesAdmin.innerHTML = "<p style='padding:10px;'>Ocurrio un error al cargar las claves</p>";
    }
  }

  async function guardarCambioClaveAdmin() {
    if (!esAdminActual) {
      limpiarMensajeCambioClaveAdmin();
      if (mensajeCambioClaveAdmin) {
        mensajeCambioClaveAdmin.textContent = "Solo el admin puede cambiar esta clave";
        mensajeCambioClaveAdmin.classList.add("mensaje-solicitud-error");
      }
      return;
    }

    const claveNueva = String(nuevaClaveAdmin?.value || "").trim();
    const claveConfirmada = String(confirmarClaveAdmin?.value || "").trim();

    limpiarMensajeCambioClaveAdmin();

    if (!claveNueva || !claveConfirmada) {
      if (mensajeCambioClaveAdmin) {
        mensajeCambioClaveAdmin.textContent = "Complete ambos campos";
        mensajeCambioClaveAdmin.classList.add("mensaje-solicitud-error");
      }
      return;
    }

    if (claveNueva.length < 4) {
      if (mensajeCambioClaveAdmin) {
        mensajeCambioClaveAdmin.textContent = "La clave debe tener al menos 4 caracteres";
        mensajeCambioClaveAdmin.classList.add("mensaje-solicitud-error");
      }
      return;
    }

    if (claveNueva !== claveConfirmada) {
      if (mensajeCambioClaveAdmin) {
        mensajeCambioClaveAdmin.textContent = "Las claves no coinciden";
        mensajeCambioClaveAdmin.classList.add("mensaje-solicitud-error");
      }
      return;
    }

    const confirmado = window.confirm("Seguro que deseas cambiar la clave del administrador?");
    if (!confirmado) return;

    if (btnGuardarCambioClaveAdmin) btnGuardarCambioClaveAdmin.disabled = true;

    const { error } = await supabase.auth.updateUser({ password: claveNueva });

    if (error) {
      console.error("Error actualizando clave del admin:", error);
      if (mensajeCambioClaveAdmin) {
        mensajeCambioClaveAdmin.textContent = "No se pudo actualizar la clave";
        mensajeCambioClaveAdmin.classList.add("mensaje-solicitud-error");
      }
      if (btnGuardarCambioClaveAdmin) btnGuardarCambioClaveAdmin.disabled = false;
      return;
    }

    if (mensajeCambioClaveAdmin) {
      mensajeCambioClaveAdmin.textContent = "Clave actualizada correctamente";
      mensajeCambioClaveAdmin.classList.add("mensaje-solicitud-exito");
    }

    mostrarMensaje("Clave actualizada correctamente");
    setTimeout(() => {
      cerrarModalCambioClaveAdmin();
    }, 900);
  }

  if (toggleClave && claveLogin && iconoOjoAbierto && iconoOjoCerrado) {
    toggleClave.addEventListener("click", () => {
      const mostrando = claveLogin.type === "text";

      if (mostrando) {
        claveLogin.type = "password";
        iconoOjoAbierto.classList.remove("oculto");
        iconoOjoCerrado.classList.add("oculto");
        toggleClave.setAttribute("aria-label", "Mostrar contrasena");
        toggleClave.setAttribute("aria-pressed", "false");
      } else {
        claveLogin.type = "text";
        iconoOjoAbierto.classList.add("oculto");
        iconoOjoCerrado.classList.remove("oculto");
        toggleClave.setAttribute("aria-label", "Ocultar contrasena");
        toggleClave.setAttribute("aria-pressed", "true");
      }
    });
  }

  function ocultarTodosLosBotonesVolver() {
    [envolturaBotonVolverRegistro, envolturaBotonVolverHistorial, envolturaBotonVolverUsuarios, envolturaBotonVolverActividad, envolturaBotonVolverClaves].forEach((item) => {
      if (!item) return;
      item.style.display = "none";
      item.style.pointerEvents = "none";
      item.style.opacity = "1";
    });
  }

  function mostrarMenuAdmin() {
    document.body.classList.remove("con-boton-volver");
    if (menuAdmin) menuAdmin.style.display = "block";
    if (seccionRegistro) seccionRegistro.style.display = "none";
    if (panelAdmin) panelAdmin.style.display = "none";
    if (panelUsuariosAdmin) panelUsuariosAdmin.style.display = "none";
    if (panelActividadAdmin) panelActividadAdmin.style.display = "none";
    if (panelClavesAdmin) panelClavesAdmin.style.display = "none";
    ocultarTodosLosBotonesVolver();
  }

  function abrirSeccionAdmin(seccion) {
    document.body.classList.add("con-boton-volver");
    if (menuAdmin) menuAdmin.style.display = "none";

    if (seccionRegistro) {
      seccionRegistro.style.display = seccion === "registro" ? "block" : "none";
    }

    if (panelAdmin) {
      panelAdmin.style.display = seccion === "historial" ? "block" : "none";
    }

    if (panelUsuariosAdmin) {
      panelUsuariosAdmin.style.display = seccion === "usuarios" ? "block" : "none";
    }

    if (panelActividadAdmin) {
      panelActividadAdmin.style.display = seccion === "actividad" ? "block" : "none";
    }

    if (panelClavesAdmin) {
      panelClavesAdmin.style.display = seccion === "claves" ? "block" : "none";
    }

    ocultarTodosLosBotonesVolver();

    if (seccion === "registro" && envolturaBotonVolverRegistro) {
      envolturaBotonVolverRegistro.style.display = "block";
      envolturaBotonVolverRegistro.style.pointerEvents = "auto";
    }

    if (seccion === "historial" && envolturaBotonVolverHistorial) {
      envolturaBotonVolverHistorial.style.display = "block";
      envolturaBotonVolverHistorial.style.pointerEvents = "auto";
    }

    if (seccion === "usuarios" && envolturaBotonVolverUsuarios) {
      envolturaBotonVolverUsuarios.style.display = "block";
      envolturaBotonVolverUsuarios.style.pointerEvents = "auto";
    }

    if (seccion === "actividad" && envolturaBotonVolverActividad) {
      envolturaBotonVolverActividad.style.display = "block";
      envolturaBotonVolverActividad.style.pointerEvents = "auto";
    }

    if (seccion === "claves" && envolturaBotonVolverClaves) {
      envolturaBotonVolverClaves.style.display = "block";
      envolturaBotonVolverClaves.style.pointerEvents = "auto";
    }
  }

  function configurarVistaAdminInicial() {
    if (esAdminActual) {
      mostrarMenuAdmin();
    } else {
      document.body.classList.remove("con-boton-volver");
      if (menuAdmin) menuAdmin.style.display = "none";
      if (seccionRegistro) seccionRegistro.style.display = "block";
      if (panelAdmin) panelAdmin.style.display = "none";
      if (panelUsuariosAdmin) panelUsuariosAdmin.style.display = "none";
      if (panelActividadAdmin) panelActividadAdmin.style.display = "none";
    if (panelClavesAdmin) panelClavesAdmin.style.display = "none";
      ocultarTodosLosBotonesVolver();
    }
  }

  function mostrarApp(usuario) {
    document.body.classList.add("app-logueada");
    document.documentElement.classList.add("app-logueada");

    if (pantallaLogin) {
      pantallaLogin.style.setProperty("display", "none", "important");
      pantallaLogin.setAttribute("aria-hidden", "true");
    }

    if (appReal) {
      appReal.style.setProperty("display", "block", "important");
      appReal.removeAttribute("aria-hidden");
    }

    if (usuarioActivo) usuarioActivo.textContent = usuario || "-";
    const rolActivoTexto = document.getElementById("rolActivoTexto");
    if (rolActivoTexto) rolActivoTexto.textContent = esAdminActual ? "Administrador" : "Usuario";

    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
  }

  function mostrarLogin() {
    document.body.classList.remove("app-logueada");
    document.documentElement.classList.remove("app-logueada");

    if (pantallaLogin) {
      pantallaLogin.style.setProperty("display", "flex", "important");
      pantallaLogin.removeAttribute("aria-hidden");
    }

    if (appReal) {
      appReal.style.setProperty("display", "none", "important");
      appReal.setAttribute("aria-hidden", "true");
    }

    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
  }

  function limpiarCamposLogin() {
    if (usuarioLogin) usuarioLogin.value = "";
    if (claveLogin) claveLogin.value = "";
  }

  function resetearOjoPassword() {
    if (claveLogin && iconoOjoAbierto && iconoOjoCerrado && toggleClave) {
      claveLogin.type = "password";
      iconoOjoAbierto.classList.remove("oculto");
      iconoOjoCerrado.classList.add("oculto");
      toggleClave.setAttribute("aria-label", "Mostrar contrasena");
      toggleClave.setAttribute("aria-pressed", "false");
    }
  }

  function construirEmailDesdeUsuario(usuario) {
    return `${usuario.toLowerCase()}@sutran.com`;
  }

  function generarInstallationId() {
    const base = `inst_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;

    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return `inst_${window.crypto.randomUUID()}`;
    }

    return base;
  }

  function obtenerInstallationIdLocal() {
    try {
      let installationId = localStorage.getItem(STORAGE_KEY_INSTALLATION_ID);

      if (!installationId) {
        installationId = generarInstallationId();
        localStorage.setItem(STORAGE_KEY_INSTALLATION_ID, installationId);
      }

      return installationId;
    } catch (error) {
      console.error("No se pudo obtener installation_id local:", error);
      return null;
    }
  }

  function obtenerDeviceInfo() {
    try {
      const partes = [];
      const ua = navigator.userAgent || "";
      const plataforma = navigator.platform || "";
      const idioma = navigator.language || "";

      if (plataforma) partes.push(plataforma);
      if (idioma) partes.push(idioma);
      if (ua) partes.push(ua);

      return partes.join(" | ").slice(0, 500);
    } catch (error) {
      console.error("No se pudo obtener device_info:", error);
      return "";
    }
  }

  function interpretarErrorIndiceInstalacion(error) {
    const mensaje = textoErrorSupabase(error).toLowerCase();

    return (
      mensaje.includes("duplicate key") ||
      mensaje.includes("unique") ||
      mensaje.includes("idx_instalacion_unica_activa")
    );
  }

  function extraerInstalacionActivaDeLista(lista) {
    const items = Array.isArray(lista) ? lista : [];
    return items.find((item) => item && item.activo === true) || null;
  }

  async function obtenerInstalacionActivaPorUsuario(userId) {
    const { data, error } = await supabase
      .from("instalaciones_usuario")
      .select("id, user_id, installation_id, device_info, activo, created_at, updated_at, desenlazado_at, desenlazado_por")
      .eq("user_id", userId)
      .eq("activo", true);

    return {
      data: extraerInstalacionActivaDeLista(data),
      error
    };
  }

  async function validarInstalacionUsuario(userId, opciones = {}) {
    const installationId = obtenerInstallationIdLocal();

    if (!installationId) {
      return {
        ok: false,
        codigo: "local_installation_error",
        mensaje: "No se pudo generar el identificador del dispositivo"
      };
    }

    const deviceInfo = obtenerDeviceInfo();

    const { data: instalacionActual, error: errorConsulta } = await obtenerInstalacionActivaPorUsuario(userId);

    if (errorConsulta) {
      console.error("Error consultando instalacion activa:", errorConsulta);
      return {
        ok: false,
        codigo: "consulta_error",
        mensaje: "No se pudo validar el dispositivo"
      };
    }

    if (!instalacionActual) {
      const { data: insertData, error: errorInsert } = await supabase
        .from("instalaciones_usuario")
        .insert([
          {
            user_id: userId,
            installation_id: installationId,
            device_info: deviceInfo,
            activo: true
          }
        ])
        .select("id, user_id, installation_id, device_info, activo")
        .maybeSingle();

      if (!errorInsert && insertData) {
        return {
          ok: true,
          installationId,
          instalacion: insertData,
          recienVinculada: true
        };
      }

      if (interpretarErrorIndiceInstalacion(errorInsert)) {
        const { data: reconsulta, error: errorReconsulta } = await obtenerInstalacionActivaPorUsuario(userId);

        if (errorReconsulta) {
          console.error("Error reconsultando instalacion:", errorReconsulta);
          return {
            ok: false,
            codigo: "consulta_error",
            mensaje: "No se pudo validar el dispositivo"
          };
        }

        if (reconsulta && reconsulta.installation_id === installationId) {
          return {
            ok: true,
            installationId,
            instalacion: reconsulta,
            recienVinculada: false
          };
        }

        return {
          ok: false,
          codigo: "otro_dispositivo",
          mensaje: "Este usuario ya esta vinculado a otro dispositivo. Contacte al administrador."
        };
      }

      console.error("Error insertando instalacion:", errorInsert);
      return {
        ok: false,
        codigo: "insert_error",
        mensaje: "No se pudo registrar el dispositivo"
      };
    }

    if (instalacionActual.installation_id === installationId) {
      const payloadUpdate = {};

      if ((instalacionActual.device_info || "") !== deviceInfo) {
        payloadUpdate.device_info = deviceInfo;
      }

      if (Object.keys(payloadUpdate).length > 0) {
        const { error: errorUpdate } = await supabase
          .from("instalaciones_usuario")
          .update(payloadUpdate)
          .eq("id", instalacionActual.id);

        if (errorUpdate) {
          console.error("Error actualizando device_info:", errorUpdate);
        }
      }

      return {
        ok: true,
        installationId,
        instalacion: instalacionActual,
        recienVinculada: false
      };
    }

    return {
      ok: false,
      codigo: "otro_dispositivo",
      mensaje: "Este usuario ya esta vinculado a otro dispositivo. Contacte al administrador."
    };
  }

  function actualizarResumenHistorial(totalRegistros, inicioMostrado = 0, finMostrado = 0) {
    if (!resumenHistorialAdmin) return;

    if (!totalRegistros || totalRegistros <= 0) {
      resumenHistorialAdmin.textContent = "Mostrando 0 de 0 registros";
      actualizarResumenGeneralAdmin();
      return;
    }

    resumenHistorialAdmin.textContent = `Mostrando ${inicioMostrado} a ${finMostrado} de ${totalRegistros} registros`;
    actualizarResumenGeneralAdmin();
  }

  function actualizarResumenUsuarios(totalUsuarios, inicioMostrado = 0, finMostrado = 0) {
    if (!resumenUsuariosAdmin) return;

    if (!totalUsuarios || totalUsuarios <= 0) {
      resumenUsuariosAdmin.textContent = "Mostrando 0 de 0 usuarios";
      actualizarResumenGeneralAdmin();
      return;
    }

    resumenUsuariosAdmin.textContent = `Mostrando ${inicioMostrado} a ${finMostrado} de ${totalUsuarios} usuarios`;
    actualizarResumenGeneralAdmin();
  }

  function ocultarPaginacionAdmin() {
    if (paginacionAdmin) {
      paginacionAdmin.style.display = "none";
    }

    if (infoPaginaAdmin) {
      infoPaginaAdmin.textContent = "Pagina 1 de 1";
    }

    if (btnPaginaAnterior) {
      btnPaginaAnterior.disabled = true;
      btnPaginaAnterior.style.opacity = "0.6";
      btnPaginaAnterior.style.cursor = "not-allowed";
    }

    if (btnPaginaSiguiente) {
      btnPaginaSiguiente.disabled = true;
      btnPaginaSiguiente.style.opacity = "0.6";
      btnPaginaSiguiente.style.cursor = "not-allowed";
    }
  }

  function mostrarPaginacionAdmin() {
    if (paginacionAdmin) {
      paginacionAdmin.style.display = "flex";
    }
  }

  function ocultarPaginacionUsuariosAdmin() {
    if (paginacionUsuariosAdmin) {
      paginacionUsuariosAdmin.style.display = "none";
    }

    if (infoPaginaUsuariosAdmin) {
      infoPaginaUsuariosAdmin.textContent = "Pagina 1 de 1";
    }

    if (btnPaginaAnteriorUsuarios) {
      btnPaginaAnteriorUsuarios.disabled = true;
      btnPaginaAnteriorUsuarios.style.opacity = "0.6";
      btnPaginaAnteriorUsuarios.style.cursor = "not-allowed";
    }

    if (btnPaginaSiguienteUsuarios) {
      btnPaginaSiguienteUsuarios.disabled = true;
      btnPaginaSiguienteUsuarios.style.opacity = "0.6";
      btnPaginaSiguienteUsuarios.style.cursor = "not-allowed";
    }
  }

  function mostrarPaginacionUsuariosAdmin() {
    if (paginacionUsuariosAdmin) {
      paginacionUsuariosAdmin.style.display = "flex";
    }
  }

  function limpiarFiltrosAdminUI() {
    if (filtroUsuarioAdmin) filtroUsuarioAdmin.value = "";
    if (filtroFechaDesdeAdmin) filtroFechaDesdeAdmin.value = "";
    if (filtroFechaHastaAdmin) filtroFechaHastaAdmin.value = "";
    if (filtroFechaAdmin) filtroFechaAdmin.value = "";
  }

  function limpiarBusquedaUsuariosAdminUI() {
    if (filtroUsuarioPanelAdmin) filtroUsuarioPanelAdmin.value = "";
  }

  function ocultarPanelAdmin() {
    document.body.classList.remove("con-boton-volver");
    if (menuAdmin) menuAdmin.style.display = "none";
    if (panelAdmin) panelAdmin.style.display = "none";
    if (panelUsuariosAdmin) panelUsuariosAdmin.style.display = "none";
    if (panelActividadAdmin) panelActividadAdmin.style.display = "none";
    if (panelClavesAdmin) panelClavesAdmin.style.display = "none";
    if (seccionRegistro) seccionRegistro.style.display = "block";
    if (envolturaBotonVolverRegistro) envolturaBotonVolverRegistro.style.display = "none";

    if (historialAdmin) historialAdmin.innerHTML = "";
    if (listaUsuariosAdmin) listaUsuariosAdmin.innerHTML = "";
    if (listaActividadAdmin) listaActividadAdmin.innerHTML = "";
    if (listaClavesAdmin) listaClavesAdmin.innerHTML = "";

    limpiarFiltrosAdminUI();
    limpiarBusquedaUsuariosAdminUI();

    registrosAdminOriginalCache = [];
    registrosAdminCache = [];
    usuariosAdminOriginalCache = [];
    usuariosAdminCache = [];
    actividadAdminCache = [];
    clavesAdminCache = [];
    detalleActividadExpandidoUserId = null;
    historialActividadCache = {};
    ordenActividadDetalleCache = {};
    if (filtroFechaDesdeActividadAdmin) filtroFechaDesdeActividadAdmin.value = '';
    if (filtroFechaHastaActividadAdmin) filtroFechaHastaActividadAdmin.value = '';
    paginaActualAdmin = 1;
    paginaActualUsuariosAdmin = 1;

    actualizarResumenHistorial(0, 0, 0);
    actualizarResumenUsuarios(0, 0, 0);
    actualizarResumenActividad(0);
    ocultarPaginacionAdmin();
    ocultarPaginacionUsuariosAdmin();
  }

  function mostrarPanelAdmin() {
    document.body.classList.remove("con-boton-volver");
    if (menuAdmin) menuAdmin.style.display = "block";
    if (panelAdmin) panelAdmin.style.display = "none";
    if (panelUsuariosAdmin) panelUsuariosAdmin.style.display = "none";
    if (panelActividadAdmin) panelActividadAdmin.style.display = "none";
    if (panelClavesAdmin) panelClavesAdmin.style.display = "none";
    if (seccionRegistro) seccionRegistro.style.display = "none";
    if (envolturaBotonVolverRegistro) envolturaBotonVolverRegistro.style.display = "none";
  }

  async function obtenerPerfilPorId(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, usuario, activo, rol")
      .eq("id", userId)
      .maybeSingle();

    return { data, error };
  }

  async function registrarIngresoActividad(userId, nombreUsuario) {
    if (!userId) return false;

    try {
      const ahora = new Date();
      const anio = ahora.getFullYear();
      const mes = String(ahora.getMonth() + 1).padStart(2, "0");
      const dia = String(ahora.getDate()).padStart(2, "0");
      const horas = String(ahora.getHours()).padStart(2, "0");
      const minutos = String(ahora.getMinutes()).padStart(2, "0");
      const segundos = String(ahora.getSeconds()).padStart(2, "0");

      const fechaIngreso = `${anio}-${mes}-${dia}`;
      const horaIngreso = `${horas}:${minutos}:${segundos}`;
      const fechaHoraIngreso = ahora.toISOString();

      const { data: actividadExistente, error: errorConsultaActividad } = await supabase
        .from("actividad_sistema")
        .select("user_id, contador_ingresos")
        .eq("user_id", userId)
        .maybeSingle();

      if (errorConsultaActividad) {
        console.error("Error consultando actividad del sistema:", errorConsultaActividad);
        return false;
      }

      const nuevoContador = actividadExistente
        ? Number(actividadExistente.contador_ingresos || 0) + 1
        : 1;

      if (actividadExistente) {
        const { error: errorUpdateActividad } = await supabase
          .from("actividad_sistema")
          .update({
            usuario: nombreUsuario || "",
            fecha_ingreso: fechaIngreso,
            hora_ingreso: horaIngreso,
            ultima_conexion: fechaHoraIngreso,
            contador_ingresos: nuevoContador
          })
          .eq("user_id", userId);

        if (errorUpdateActividad) {
          console.error("Error actualizando actividad del sistema:", errorUpdateActividad);
          return false;
        }
      } else {
        const { error: errorInsertActividad } = await supabase
          .from("actividad_sistema")
          .insert([
            {
              user_id: userId,
              usuario: nombreUsuario || "",
              fecha_ingreso: fechaIngreso,
              hora_ingreso: horaIngreso,
              ultima_conexion: fechaHoraIngreso,
              contador_ingresos: 1
            }
          ]);

        if (errorInsertActividad) {
          console.error("Error insertando actividad del sistema:", errorInsertActividad);
          return false;
        }
      }

      const payloadHistorial = {
        user_id: userId,
        usuario: nombreUsuario || "",
        fecha_hora_ingreso: fechaHoraIngreso,
        tipo: "exitoso",
        motivo: null
      };

      const { data: historialInsertado, error: errorInsertHistorial } = await supabase
        .from("actividad_sistema_historial")
        .insert([payloadHistorial])
        .select("id, user_id, usuario, fecha_hora_ingreso, tipo, motivo")
        .maybeSingle();

      if (errorInsertHistorial) {
        console.error("Error insertando historial de actividad:", errorInsertHistorial);
      } else {
        const clavesCache = new Set([String(userId)]);
        const usuarioNormalizado = normalizarUsuarioSolicitud(nombreUsuario || "");
        if (usuarioNormalizado) {
          clavesCache.add(`usuario:${usuarioNormalizado}`);
        }

        clavesCache.forEach((clave) => {
          if (Array.isArray(historialActividadCache[clave])) {
            historialActividadCache[clave] = historialInsertado
              ? [historialInsertado, ...historialActividadCache[clave]]
              : [
                  {
                    id: `temp_${Date.now()}`,
                    user_id: userId,
                    usuario: nombreUsuario || "",
                    fecha_hora_ingreso: fechaHoraIngreso,
                    tipo: "exitoso",
                    motivo: null
                  },
                  ...historialActividadCache[clave]
                ];
          }
        });
      }

      const indiceActividad = actividadAdminCache.findIndex((item) => item && item.user_id === userId);

      if (indiceActividad >= 0) {
        actividadAdminCache[indiceActividad] = {
          ...actividadAdminCache[indiceActividad],
          usuario: nombreUsuario || actividadAdminCache[indiceActividad].usuario || "-",
          fecha_ingreso: fechaIngreso,
          hora_ingreso: horaIngreso,
          ultima_conexion: fechaHoraIngreso,
          contador_ingresos: nuevoContador
        };
      }

      return true;
    } catch (error) {
      console.error("Error general registrando ingreso de actividad:", error);
      return false;
    }
  }

  async function registrarIngresoFallido(usuarioIntentado, motivo = "credenciales_incorrectas", userId = null) {
    try {
      const fechaHoraIngreso = new Date().toISOString();

      const payloadHistorial = {
        user_id: userId || null,
        usuario: usuarioIntentado || "",
        fecha_hora_ingreso: fechaHoraIngreso,
        tipo: "fallido",
        motivo: motivo
      };

      const { data: historialInsertado, error } = await supabase
        .from("actividad_sistema_historial")
        .insert([payloadHistorial])
        .select("id, user_id, usuario, fecha_hora_ingreso, tipo, motivo")
        .maybeSingle();

      if (error) {
        console.error("Error insertando ingreso fallido:", error);
        return false;
      }

      const clavesCache = new Set();

      if (userId) {
        clavesCache.add(String(userId));
      }

      const usuarioNormalizado = normalizarUsuarioSolicitud(usuarioIntentado || "");
      if (usuarioNormalizado) {
        clavesCache.add(`usuario:${usuarioNormalizado}`);
      }

      clavesCache.forEach((clave) => {
        if (Array.isArray(historialActividadCache[clave])) {
          historialActividadCache[clave] = historialInsertado
            ? [historialInsertado, ...historialActividadCache[clave]]
            : [
                {
                  id: `temp_${Date.now()}`,
                  user_id: userId || null,
                  usuario: usuarioIntentado || "",
                  fecha_hora_ingreso: fechaHoraIngreso,
                  tipo: "fallido",
                  motivo: motivo
                },
                ...historialActividadCache[clave]
              ];
        }
      });

      return true;
    } catch (error) {
      console.error("Error general registrando ingreso fallido:", error);
      return false;
    }
  }

  function obtenerClaveActividad(item = {}) {
    if (item && item.user_id) return String(item.user_id);
    const usuarioNormalizado = normalizarUsuarioSolicitud(item && item.usuario ? item.usuario : "");
    if (usuarioNormalizado) return `usuario:${usuarioNormalizado}`;
    return `actividad:${Date.now()}`;
  }

  function obtenerUltimoEventoActividad(item) {
    if (!item) return null;

    const eventos = [];

    if (item.ultima_conexion) {
      eventos.push({
        tipo: "exitoso",
        fecha_hora_ingreso: item.ultima_conexion,
        motivo: ""
      });
    }

    if (item.ultimo_intento) {
      eventos.push({
        tipo: item.ultimo_tipo || "fallido",
        fecha_hora_ingreso: item.ultimo_intento,
        motivo: item.ultimo_motivo || ""
      });
    }

    if (!eventos.length) return null;

    eventos.sort((a, b) => {
      const ta = a.fecha_hora_ingreso ? new Date(a.fecha_hora_ingreso).getTime() : 0;
      const tb = b.fecha_hora_ingreso ? new Date(b.fecha_hora_ingreso).getTime() : 0;
      return tb - ta;
    });

    return eventos[0];
  }

  function obtenerEstadoTarjetaActividad(item) {
    if (!item) {
      return { texto: "Sin actividad", clase: "tarjeta-actividad-admin-pill-neutro", tipo: "neutro" };
    }

    const ultimoEvento = obtenerUltimoEventoActividad(item);

    if (!ultimoEvento) {
      return { texto: "Sin actividad", clase: "tarjeta-actividad-admin-pill-neutro", tipo: "neutro" };
    }

    // El estado visible depende SOLO del ultimo evento real.
    // Si el usuario ingreso bien despues de un fallo anterior, vuelve a Activo.
    if (String(ultimoEvento.tipo || "").toLowerCase() === "fallido") {
      return { texto: "Intento fallido", clase: "tarjeta-actividad-admin-pill-fallido", tipo: "fallido" };
    }

    return { texto: "Activo", clase: "tarjeta-actividad-admin-pill-exito", tipo: "exitoso" };
  }

  // =========================
  // FECHA Y HORA AUTOMATICAS
  // =========================
  const fechaInput = document.getElementById("fecha");
  const horaInput = document.getElementById("hora");

  function ponerFechaHoraActual() {
    if (!fechaInput || !horaInput) return;

    const ahora = new Date();

    const ano = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, "0");
    const dia = String(ahora.getDate()).padStart(2, "0");
    fechaInput.value = `${ano}-${mes}-${dia}`;

    const horas = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");
    const segundos = String(ahora.getSeconds()).padStart(2, "0");
    horaInput.value = `${horas}:${minutos}:${segundos}`;
  }

  if (fechaInput && horaInput) {
    horaInput.setAttribute("lang", "en-US");
    horaInput.setAttribute("inputmode", "numeric");
    horaInput.setAttribute("autocomplete", "off");
    ponerFechaHoraActual();
  }

  // =========================
  // ELEMENTOS APP
  // =========================
  const inputFoto = document.getElementById("foto");
  const inputCoordenadas = document.getElementById("coordenadas");
  const inputFecha = document.getElementById("fecha");
  const opcionCamper = document.getElementById("opcionCamper");
  const opcionMovilBus = document.getElementById("opcionMovilBus");
  const opcionGrupoAla = document.getElementById("opcionGrupoAla");
  const inputHora = document.getElementById("hora");
  const inputUbicacion = document.getElementById("ubicacion");
  const botonGenerar = document.getElementById("generar");
  const botonDescargar = document.getElementById("descargar");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const nombreArchivo = document.getElementById("nombreArchivo");
  const uploadBox = document.getElementById("uploadBox");

  const TEXT_SIZE = 14;

  // =========================
  // VALORES INICIALES DEL FORMULARIO
  // =========================
  const VALOR_INICIAL_COORDENADAS = inputCoordenadas ? inputCoordenadas.value : "";
  const VALOR_INICIAL_UBICACION = inputUbicacion ? inputUbicacion.value : "";
  const TEXTO_INICIAL_NOMBRE_ARCHIVO = nombreArchivo ? nombreArchivo.textContent : "Sin archivos seleccionados";

  const OPCIONES_UNIDAD = {
    camper: {
      latPrefijo: "-6.48",
      lngPrefijo: "-76.32",
      km: "611",
      plusBase: 1257,
      ubicacionBase: "SAN MARTIN-SAN MARTIN-LA BANDA DE SHILCAYO KM. 611 + "
    },
    movil_bus: {
      latPrefijo: "-6.48",
      lngPrefijo: "-76.37",
      km: "604",
      plusBase: 362,
      ubicacionBase: "SAN MARTIN-SAN MARTIN-MORALES KM. 604 + "
    },
    grupo_ala: {
      latPrefijo: "-6.49",
      lngPrefijo: "-76.38",
      km: "605",
      plusBase: 1227,
      ubicacionBase: "SAN MARTIN-SAN MARTIN-MORALES KM. 605 + "
    }
  };

  function generarDecimalesAleatorios(cantidad) {
    let salida = "";
    for (let i = 0; i < cantidad; i++) {
      salida += Math.floor(Math.random() * 10);
    }
    return salida;
  }

  function generarCoordenadaDesdePrefijo(prefijo) {
    return `${prefijo}${generarDecimalesAleatorios(5)}`;
  }

  function generarPlusAleatorio(base) {
    const baseNumero = Number(base) || 0;
    const variacion = Math.floor(Math.random() * 9000);
    return String(baseNumero + variacion).padStart(4, "0");
  }

  // =========================
  // ESTADO GUARDADO SUPABASE
  // =========================
  let dataUrlGeneradaActual = null;
  let imagenListaParaGuardar = false;
  let guardandoEnSupabase = false;
  let ultimoStoragePathGuardado = null;
  let ultimaPublicUrlGuardada = null;

  function resetearEstadoImagenGenerada() {
    dataUrlGeneradaActual = null;
    imagenListaParaGuardar = false;
    guardandoEnSupabase = false;
    ultimoStoragePathGuardado = null;
    ultimaPublicUrlGuardada = null;

    if (botonDescargar) {
      botonDescargar.disabled = true;
      botonDescargar.style.background = "#9aa0a6";
    }
  }

  function dibujarPlaceholderCanvas() {
    if (!canvas || !ctx) return;

    canvas.width = 1080;
    canvas.height = 720;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 62px Arial, sans-serif";
    ctx.fillStyle = "#666";
    ctx.fillText(
      "Aqui se mostrara la imagen generada",
      canvas.width / 2,
      canvas.height / 2
    );
    ctx.restore();
  }

  function limpiarCanvas() {
    if (!canvas || !ctx) return;

    if (canvas.width > 0 && canvas.height > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    dibujarPlaceholderCanvas();
  }

  function aplicarDatosUnidad(tipoUnidad) {
    const datos = OPCIONES_UNIDAD[tipoUnidad];

    if (!datos) return;

    if (inputCoordenadas) {
      const latitud = generarCoordenadaDesdePrefijo(datos.latPrefijo);
      const longitud = generarCoordenadaDesdePrefijo(datos.lngPrefijo);
      inputCoordenadas.value = `${latitud}, ${longitud}`;
    }

    if (inputUbicacion) {
      const plusAleatorio = generarPlusAleatorio(datos.plusBase);
      inputUbicacion.value = `${datos.ubicacionBase}${plusAleatorio}`;
    }
  }

  function obtenerTipoUnidadSeleccionada() {
    if (opcionMovilBus && opcionMovilBus.checked) return "movil_bus";
    if (opcionGrupoAla && opcionGrupoAla.checked) return "grupo_ala";
    return "camper";
  }

  function seleccionarUnidadPorTipo(tipoUnidad) {
    if (tipoUnidad === "movil_bus" && opcionMovilBus) {
      opcionMovilBus.checked = true;
    } else if (tipoUnidad === "grupo_ala" && opcionGrupoAla) {
      opcionGrupoAla.checked = true;
    } else if (opcionCamper) {
      opcionCamper.checked = true;
    }

    aplicarDatosUnidad(obtenerTipoUnidadSeleccionada());
  }

  function limpiarFormularioApp() {
    if (inputFoto) inputFoto.value = "";

    if (nombreArchivo) {
      nombreArchivo.textContent = TEXTO_INICIAL_NOMBRE_ARCHIVO || "Sin archivos seleccionados";
    }

    if (uploadBox) {
      uploadBox.classList.remove("upload-box-cargada");
    }

    if (inputCoordenadas) {
      inputCoordenadas.value = VALOR_INICIAL_COORDENADAS || "";
    }

    if (inputUbicacion) {
      inputUbicacion.value = VALOR_INICIAL_UBICACION || "";
    }

    seleccionarUnidadPorTipo("camper");
    ponerFechaHoraActual();
    limpiarCanvas();
    resetearEstadoImagenGenerada();
  }

  async function ejecutarCierreAutomatico() {
    limpiarTemporizadorSesion();

    try {
      await supabase.auth.signOut();
    } catch (err) {}

    perfilActual = null;
    esAdminActual = false;

    localStorage.removeItem("usuarioLogeado");
    limpiarCamposLogin();
    resetearOjoPassword();
    ocultarPanelAdmin();
    limpiarFormularioApp();

    if (mensajeLogin) {
      mensajeLogin.textContent = "La sesion expiro despues de 5 minutos";
    }

    mostrarLogin();
    mostrarBody();
  }

  function iniciarTemporizadorSesion() {
    limpiarTemporizadorSesion();

    temporizadorSesion = setTimeout(() => {
      ejecutarCierreAutomatico();
    }, DURACION_SESION_MS);
  }

  async function revisarSesion() {
    try {
      if (mensajeLogin) mensajeLogin.textContent = "";

      const { data, error } = await supabase.auth.getSession();

      if (error) {
        limpiarTemporizadorSesion();
        perfilActual = null;
        esAdminActual = false;
        ocultarPanelAdmin();
        limpiarFormularioApp();
        mostrarLogin();
        mostrarBody();
        return;
      }

      const session = data?.session;

      if (!session || !session.user) {
        limpiarTemporizadorSesion();
        perfilActual = null;
        esAdminActual = false;
        ocultarPanelAdmin();
        limpiarFormularioApp();
        mostrarLogin();
        mostrarBody();
        return;
      }

      const user = session.user;
      const { data: perfil, error: errorPerfil } = await obtenerPerfilPorId(user.id);

      if (errorPerfil) {
        console.error("Error al verificar perfil:", errorPerfil);
        limpiarTemporizadorSesion();
        perfilActual = null;
        esAdminActual = false;
        ocultarPanelAdmin();
        limpiarFormularioApp();
        if (mensajeLogin) mensajeLogin.textContent = "Error al verificar el perfil";
        mostrarLogin();
        mostrarBody();
        return;
      }

      if (!perfil) {
        limpiarTemporizadorSesion();
        perfilActual = null;
        esAdminActual = false;
        ocultarPanelAdmin();
        limpiarFormularioApp();
        if (mensajeLogin) mensajeLogin.textContent = "No se encontro el perfil del usuario";
        mostrarLogin();
        mostrarBody();
        return;
      }

      if (perfil.activo !== true) {
        limpiarTemporizadorSesion();
        perfilActual = null;
        esAdminActual = false;
        ocultarPanelAdmin();
        limpiarFormularioApp();
        if (mensajeLogin) mensajeLogin.textContent = "Usuario inactivo o bloqueado";
        await supabase.auth.signOut();
        mostrarLogin();
        mostrarBody();
        return;
      }

      const esAdminPerfil = (perfil.rol || "").toLowerCase() === "admin";

      if (!esAdminPerfil) {
        const validacionInstalacion = await validarInstalacionUsuario(user.id);

        if (!validacionInstalacion.ok) {
          limpiarTemporizadorSesion();
          perfilActual = null;
          esAdminActual = false;
          ocultarPanelAdmin();
          limpiarFormularioApp();
          if (mensajeLogin) mensajeLogin.textContent = validacionInstalacion.mensaje || "No se pudo validar el dispositivo";
          await supabase.auth.signOut();
          mostrarLogin();
          mostrarBody();
          return;
        }
      }

      perfilActual = perfil;
      esAdminActual = esAdminPerfil;

      if (!esAdminPerfil) {
        await registrarIngresoActividad(user.id, perfil.usuario || "");
      }

      localStorage.setItem("usuarioLogeado", perfil.usuario || "");
      mostrarApp(perfil.usuario || user.email || "");

      if (esAdminActual) {
        paginaActualAdmin = 1;
        configurarVistaAdminInicial();
        await cargarHistorialAdmin();
        await cargarUsuariosAdmin();
        await cargarSolicitudesAdmin();
        await cargarActividadAdmin();
      } else {
        ocultarPanelAdmin();
        configurarVistaAdminInicial();
      }

      iniciarTemporizadorSesion();
      mostrarBody();
    } catch (err) {
      console.error("Error general al revisar sesion:", err);
      limpiarTemporizadorSesion();
      perfilActual = null;
      esAdminActual = false;
      ocultarPanelAdmin();
      limpiarFormularioApp();
      if (mensajeLogin) mensajeLogin.textContent = "Error al revisar la sesion";
      mostrarLogin();
      mostrarBody();
    }
  }

  async function iniciarSesion(e) {
    if (e) e.preventDefault();

    const usuarioIngresado = usuarioLogin ? usuarioLogin.value.trim() : "";
    const claveIngresada = claveLogin ? claveLogin.value.trim() : "";

    if (!usuarioIngresado || !claveIngresada) {
      if (mensajeLogin) mensajeLogin.textContent = "Ingrese usuario y contrasena";
      return;
    }

    if (mensajeLogin) mensajeLogin.textContent = "Validando...";
    if (btnIngresar) btnIngresar.disabled = true;

    try {
      const emailTecnico = construirEmailDesdeUsuario(usuarioIngresado);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailTecnico,
        password: claveIngresada
      });

      if (error || !data || !data.user) {
        console.error("Error al iniciar sesion:", error);
        await registrarIngresoFallido(usuarioIngresado, "credenciales_incorrectas");
        if (mensajeLogin) mensajeLogin.textContent = "Usuario o contrasena incorrectos";
        return;
      }

      const { data: perfil, error: errorPerfil } = await obtenerPerfilPorId(data.user.id);

      if (errorPerfil) {
        console.error("Error consultando perfil:", errorPerfil);
        if (mensajeLogin) mensajeLogin.textContent = "Error al consultar el perfil";
        return;
      }

      if (!perfil) {
        if (mensajeLogin) mensajeLogin.textContent = "No se encontro el perfil del usuario";
        return;
      }

      if (perfil.activo !== true) {
        await registrarIngresoFallido(usuarioIngresado, "usuario_inactivo", data.user.id);
        await supabase.auth.signOut();
        if (mensajeLogin) mensajeLogin.textContent = "Usuario inactivo o bloqueado";
        return;
      }

      const esAdminPerfil = (perfil.rol || "").toLowerCase() === "admin";

      if (!esAdminPerfil) {
        const validacionInstalacion = await validarInstalacionUsuario(data.user.id);

        if (!validacionInstalacion.ok) {
          await registrarIngresoFallido(usuarioIngresado, "dispositivo_no_autorizado", data.user.id);
          await supabase.auth.signOut();
          if (mensajeLogin) mensajeLogin.textContent = validacionInstalacion.mensaje || "No se pudo validar el dispositivo";
          return;
        }
      }

      perfilActual = perfil;
      esAdminActual = esAdminPerfil;

      if (!esAdminPerfil) {
        await registrarIngresoActividad(data.user.id, perfil.usuario || usuarioIngresado);
      }

      localStorage.setItem("usuarioLogeado", perfil.usuario || usuarioIngresado);
      if (mensajeLogin) mensajeLogin.textContent = "";

      limpiarFormularioApp();
      mostrarApp(perfil.usuario || usuarioIngresado);

      if (esAdminActual) {
        paginaActualAdmin = 1;
        configurarVistaAdminInicial();
        await cargarHistorialAdmin();
        await cargarUsuariosAdmin();
        await cargarSolicitudesAdmin();
        await cargarActividadAdmin();
      } else {
        ocultarPanelAdmin();
        configurarVistaAdminInicial();
      }

      iniciarTemporizadorSesion();
      mostrarBody();
    } catch (err) {
      console.error("Ocurrio un error al iniciar sesion:", err);
      if (mensajeLogin) mensajeLogin.textContent = "Ocurrio un error al iniciar sesion";
      mostrarBody();
    } finally {
      if (btnIngresar) btnIngresar.disabled = false;
    }
  }

  if (btnIngresar) btnIngresar.addEventListener("click", iniciarSesion);

  if (btnAbrirSolicitud) {
    btnAbrirSolicitud.addEventListener("click", () => {
      abrirModalSolicitud();
    });
  }

  if (btnCancelarSolicitud) {
    btnCancelarSolicitud.addEventListener("click", () => {
      cerrarModalSolicitud();
    });
  }

  if (btnEntendidoSolicitud) {
    btnEntendidoSolicitud.addEventListener("click", () => {
      cerrarModalSolicitud();
    });
  }

  if (cerrarModalSolicitudBackdrop) {
    cerrarModalSolicitudBackdrop.addEventListener("click", () => {
      cerrarModalSolicitud();
    });
  }

  if (btnEnviarSolicitud) {
    btnEnviarSolicitud.addEventListener("click", async () => {
      await enviarSolicitudAcceso();
    });
  }

  if (claveLogin) {
    claveLogin.addEventListener("keydown", (e) => {
      if (e.key === "Enter") iniciarSesion(e);
    });
  }

  if (usuarioLogin) {
    usuarioLogin.addEventListener("keydown", (e) => {
      if (e.key === "Enter") iniciarSesion(e);
    });
  }

  [usuarioSolicitud, claveSolicitud, nombreCompletoSolicitud].forEach((campo) => {
    if (!campo) return;
    campo.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        await enviarSolicitudAcceso();
      }
    });
  });

  if (cerrarSesion) {
    cerrarSesion.addEventListener("click", async (e) => {
      if (e) e.preventDefault();

      try {
        await supabase.auth.signOut();
      } catch (err) {}

      limpiarTemporizadorSesion();
      perfilActual = null;
      esAdminActual = false;
      localStorage.removeItem("usuarioLogeado");
      limpiarCamposLogin();
      resetearOjoPassword();
      ocultarPanelAdmin();
      limpiarFormularioApp();
      cerrarModalSolicitud();

      if (mensajeLogin) mensajeLogin.textContent = "";
      mostrarLogin();
      mostrarBody();
    });
  }

  if (btnMenuRegistro) {
    btnMenuRegistro.addEventListener("click", () => {
      abrirSeccionAdmin("registro");
    });
  }

  if (btnMenuHistorial) {
    btnMenuHistorial.addEventListener("click", () => {
      abrirSeccionAdmin("historial");
    });
  }

  if (btnMenuUsuarios) {
    btnMenuUsuarios.addEventListener("click", () => {
      abrirSeccionAdmin("usuarios");
    });
  }

  if (btnMenuActividad) {
    btnMenuActividad.addEventListener("click", async () => {
      abrirSeccionAdmin("actividad");
      await cargarActividadAdmin();
    });
  }

  if (btnMenuClaves) {
    btnMenuClaves.addEventListener("click", async () => {
      abrirSeccionAdmin("claves");
      await cargarClavesAdmin();
    });
  }

  if (btnVolverMenuDesdeRegistro) {
    btnVolverMenuDesdeRegistro.addEventListener("click", () => {
      mostrarMenuAdmin();
    });
  }

  if (btnVolverMenuDesdeHistorial) {
    btnVolverMenuDesdeHistorial.addEventListener("click", () => {
      mostrarMenuAdmin();
    });
  }

  if (btnVolverMenuDesdeUsuarios) {
    btnVolverMenuDesdeUsuarios.addEventListener("click", () => {
      mostrarMenuAdmin();
    });
  }

  if (btnVolverMenuDesdeActividad) {
    btnVolverMenuDesdeActividad.addEventListener("click", () => {
      detalleActividadExpandidoUserId = null;
      mostrarMenuAdmin();
    });
  }

  if (btnVolverMenuDesdeClaves) {
    btnVolverMenuDesdeClaves.addEventListener("click", () => {
      mostrarMenuAdmin();
    });
  }

  if (btnRecargarActividadAdmin) {
    btnRecargarActividadAdmin.addEventListener("click", async () => {
      detalleActividadExpandidoUserId = null;
      await cargarActividadAdmin();
    });
  }

  if (btnRecargarClavesAdmin) {
    btnRecargarClavesAdmin.addEventListener("click", async () => {
      await cargarClavesAdmin();
    });
  }

  if (btnAbrirCambioClaveAdmin) {
    btnAbrirCambioClaveAdmin.addEventListener("click", () => {
      abrirModalCambioClaveAdmin();
    });
  }

  if (cerrarModalCambioClaveBackdrop) {
    cerrarModalCambioClaveBackdrop.addEventListener("click", () => {
      cerrarModalCambioClaveAdmin();
    });
  }

  if (btnCancelarCambioClaveAdmin) {
    btnCancelarCambioClaveAdmin.addEventListener("click", () => {
      cerrarModalCambioClaveAdmin();
    });
  }

  if (btnGuardarCambioClaveAdmin) {
    btnGuardarCambioClaveAdmin.addEventListener("click", async () => {
      await guardarCambioClaveAdmin();
    });
  }

  if (listaClavesAdmin) {
    listaClavesAdmin.addEventListener("click", async (event) => {
      const botonCopiarClave = event.target.closest(".btn-copiar-clave-admin");
      if (botonCopiarClave) {
        const contenedorClaveCopiar = botonCopiarClave.closest(".tarjeta-clave-campo");
        const valorClaveCopiar = contenedorClaveCopiar ? contenedorClaveCopiar.querySelector(".tarjeta-clave-valor") : null;
        const claveRealCopiar = valorClaveCopiar ? (valorClaveCopiar.dataset.claveReal || "") : "";
        if (claveRealCopiar) {
          try {
            await navigator.clipboard.writeText(claveRealCopiar);
            botonCopiarClave.classList.add("copiado");
            setTimeout(() => botonCopiarClave.classList.remove("copiado"), 900);
          } catch (error) {
            const temporal = document.createElement("textarea");
            temporal.value = claveRealCopiar;
            document.body.appendChild(temporal);
            temporal.select();
            document.execCommand("copy");
            temporal.remove();
          }
        }
        return;
      }

      const botonToggleClave = event.target.closest(".btn-toggle-clave-admin");
      if (!botonToggleClave) return;

      const contenedorClave = botonToggleClave.closest(".tarjeta-clave-campo");
      const valorClave = contenedorClave ? contenedorClave.querySelector(".tarjeta-clave-valor") : null;
      if (!valorClave) return;

      const estaVisible = valorClave.dataset.visible === "true";
      const claveReal = valorClave.dataset.claveReal || "";
      if (!claveReal) return;

      if (estaVisible) {
        valorClave.textContent = "••••••••";
        valorClave.dataset.visible = "false";
        valorClave.classList.add("tarjeta-clave-valor-oculta");
        botonToggleClave.innerHTML = obtenerIconoOjoClaveSvg(false);
        botonToggleClave.setAttribute("aria-label", "Mostrar clave");
        botonToggleClave.setAttribute("aria-pressed", "false");
        botonToggleClave.setAttribute("title", "Mostrar clave");
      } else {
        valorClave.textContent = claveReal;
        valorClave.dataset.visible = "true";
        valorClave.classList.remove("tarjeta-clave-valor-oculta");
        botonToggleClave.innerHTML = obtenerIconoOjoClaveSvg(true);
        botonToggleClave.setAttribute("aria-label", "Ocultar clave");
        botonToggleClave.setAttribute("aria-pressed", "true");
        botonToggleClave.setAttribute("title", "Ocultar clave");
      }
    });
  }

  if (filtroFechaDesdeActividadAdmin) {
    filtroFechaDesdeActividadAdmin.addEventListener("change", () => {
      detalleActividadExpandidoUserId = null;
      renderizarActividadAdmin();
    });
  }

  if (filtroFechaHastaActividadAdmin) {
    filtroFechaHastaActividadAdmin.addEventListener("change", () => {
      detalleActividadExpandidoUserId = null;
      renderizarActividadAdmin();
    });
  }

  if (btnLimpiarActividadAdmin) {
    btnLimpiarActividadAdmin.addEventListener("click", () => {
      if (filtroFechaDesdeActividadAdmin) filtroFechaDesdeActividadAdmin.value = "";
      if (filtroFechaHastaActividadAdmin) filtroFechaHastaActividadAdmin.value = "";
      detalleActividadExpandidoUserId = null;
      renderizarActividadAdmin();
    });
  }

  if (listaActividadAdmin) {
    listaActividadAdmin.addEventListener("click", async (event) => {
      const botonOrden = event.target.closest(".btn-actividad-orden");
      if (botonOrden) {
        const userIdOrden = botonOrden.getAttribute("data-user-id");
        if (userIdOrden) {
          ordenActividadDetalleCache[userIdOrden] = ordenActividadDetalleCache[userIdOrden] === "asc" ? "desc" : "asc";
          renderizarActividadAdmin();
        }
        return;
      }

      const botonDetalle = event.target.closest(".btn-actividad-detalle");
      if (!botonDetalle) return;

      const userId = botonDetalle.getAttribute("data-user-id");
      if (!userId) return;

      await toggleDetalleActividadAdmin(userId);
    });
  }

  if (opcionCamper) {
    opcionCamper.addEventListener("change", () => {
      if (opcionCamper.checked) {
        aplicarDatosUnidad("camper");
      }
    });
  }

  if (opcionMovilBus) {
    opcionMovilBus.addEventListener("change", () => {
      if (opcionMovilBus.checked) {
        aplicarDatosUnidad("movil_bus");
      }
    });
  }

  if (opcionGrupoAla) {
    opcionGrupoAla.addEventListener("change", () => {
      if (opcionGrupoAla.checked) {
        aplicarDatosUnidad("grupo_ala");
      }
    });
  }

  seleccionarUnidadPorTipo("camper");

  if (botonDescargar) {
    botonDescargar.disabled = true;
    botonDescargar.style.background = "#9aa0a6";
  }

  if (inputFoto && nombreArchivo) {
    inputFoto.addEventListener("change", function () {
      const tieneArchivo = !!(inputFoto.files && inputFoto.files[0]);

      if (tieneArchivo) {
        nombreArchivo.textContent = inputFoto.files[0].name;
      } else {
        nombreArchivo.textContent = TEXTO_INICIAL_NOMBRE_ARCHIVO || "Sin archivos seleccionados";
      }

      if (uploadBox) {
        uploadBox.classList.toggle("upload-box-cargada", tieneArchivo);
      }
    });
  }

  function mostrarMensaje(texto) {
    let mensaje = document.getElementById("mensaje");

    if (!mensaje) {
      mensaje = document.createElement("div");
      mensaje.id = "mensaje";
      mensaje.style.position = "fixed";
      mensaje.style.bottom = "20px";
      mensaje.style.left = "50%";
      mensaje.style.transform = "translateX(-50%)";
      mensaje.style.background = "#333";
      mensaje.style.color = "#fff";
      mensaje.style.padding = "10px 16px";
      mensaje.style.borderRadius = "8px";
      mensaje.style.fontSize = "14px";
      mensaje.style.zIndex = "9999";
      mensaje.style.transition = "opacity 0.25s ease";
      document.body.appendChild(mensaje);
    }

    mensaje.textContent = texto;
    mensaje.style.opacity = "1";

    setTimeout(() => {
      mensaje.style.opacity = "0";
    }, 2000);
  }

  function escapeHtml(texto) {
    return String(texto || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatearFecha(fechaISO) {
    if (!fechaISO) return "";
    const partes = fechaISO.split("-");
    if (partes.length !== 3) return fechaISO;

    const dia = parseInt(partes[2], 10);
    const mes = partes[1];
    const ano = partes[0];

    return dia + "/" + mes + "/" + ano;
  }

  function formatearFechaHoraRegistro(registro) {
    const fechaTexto = registro?.fecha_texto || "";
    const horaTexto = registro?.hora_texto || "";

    if (!fechaTexto && !horaTexto) return "-";

    let fechaFormateada = fechaTexto;

    if (fechaTexto && /^\d{4}-\d{2}-\d{2}$/.test(fechaTexto)) {
      const [anio, mes, dia] = fechaTexto.split("-");
      fechaFormateada = `${dia}/${mes}/${anio}`;
    }

    return `${fechaFormateada}${horaTexto ? " " + horaTexto : ""}`.trim();
  }

  function formatearCreatedAt(createdAt) {
    if (!createdAt) return "-";

    const fecha = new Date(createdAt);

    if (isNaN(fecha.getTime())) return createdAt;

    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    const horas = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    const segundos = String(fecha.getSeconds()).padStart(2, "0");

    return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
  }

  function medirTextoAPK(texto, escalaX = 1) {
    ctx.save();
    ctx.font = `${TEXT_SIZE}px sans-serif`;
    const ancho = ctx.measureText(String(texto || "")).width * escalaX;
    ctx.restore();
    return ancho;
  }

  function limitarTextoSinPuntos(texto, maxAncho, escalaX = 1) {
    let textoFinal = texto;

    if (medirTextoAPK(textoFinal, escalaX) <= maxAncho) return textoFinal;

    while (textoFinal.length > 0 && medirTextoAPK(textoFinal, escalaX) > maxAncho) {
      textoFinal = textoFinal.slice(0, -1);
    }

    return textoFinal;
  }

  function dibujarLineaAPK(texto, x, y, escalaX = 1) {
    ctx.save();

    // Ajuste vertical tipo APK: texto ligeramente "agachado"
    const ESCALA_Y = 0.980;

    ctx.translate(Math.round(x), Math.round(y));
    ctx.scale(escalaX, ESCALA_Y);
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    ctx.font = `${TEXT_SIZE}px sans-serif`;

    ctx.shadowColor = "rgba(0,0,0,1)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(texto, 0, 0);
    ctx.restore();
  }

  async function obtenerUsuarioActual() {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data || !data.user) {
        console.error("No se pudo obtener el usuario actual:", error);
        return null;
      }

      return data.user;
    } catch (err) {
      console.error("Error obteniendo usuario actual:", err);
      return null;
    }
  }

  function dataURLtoBlob(dataURL) {
    const partes = dataURL.split(",");
    const mimeMatch = partes[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
    const binario = atob(partes[1]);
    const largo = binario.length;
    const u8arr = new Uint8Array(largo);

    for (let i = 0; i < largo; i++) {
      u8arr[i] = binario.charCodeAt(i);
    }

    return new Blob([u8arr], { type: mime });
  }

  function obtenerExtensionSeguro(nombre) {
    if (!nombre || typeof nombre !== "string") return "jpg";
    const partes = nombre.split(".");
    if (partes.length < 2) return "jpg";
    return partes.pop().toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  }

  function obtenerNombreBaseSeguro(nombre) {
    if (!nombre || typeof nombre !== "string") return "imagen";
    const sinExtension = nombre.replace(/\.[^/.]+$/, "");
    return sinExtension.replace(/[^a-zA-Z0-9_-]/g, "_") || "imagen";
  }

  async function subirImagenDescargadaYGuardarRegistro(dataURL) {
    try {
      const usuario = await obtenerUsuarioActual();

      if (!usuario) {
        mostrarMensaje("No se encontro la sesion del usuario");
        return false;
      }

      const archivoOriginal = inputFoto && inputFoto.files ? inputFoto.files[0] : null;
      const nombreOriginal = archivoOriginal ? archivoOriginal.name : "imagen.jpg";
      const extensionOriginal = obtenerExtensionSeguro(nombreOriginal);
      const nombreBaseOriginal = obtenerNombreBaseSeguro(nombreOriginal);

      const coordenadas = inputCoordenadas ? inputCoordenadas.value.trim() : "";
      const ubicacion = inputUbicacion ? inputUbicacion.value.trim().toUpperCase() : "";
      const fechaTexto = inputFecha ? inputFecha.value.trim() : "";
      const horaTexto = inputHora ? inputHora.value.trim() : "";

      const blob = dataURLtoBlob(dataURL);
      const ahora = new Date();
      const timestamp = ahora.getTime();

      const nombreGuardado = `${nombreBaseOriginal}_${timestamp}.${extensionOriginal === "png" ? "png" : "jpg"}`;
      const storagePath = `user_${usuario.id}/${nombreGuardado}`;

      const { error: errorUpload } = await supabase.storage
        .from("imagenes-generadas")
        .upload(storagePath, blob, {
          contentType: "image/jpeg",
          upsert: false
        });

      if (errorUpload) {
        console.error("Error al subir imagen a Storage:", errorUpload);
        mostrarMensaje("Se descargo, pero fallo guardar en Supabase");
        return false;
      }

      const { data: dataPublicUrl } = supabase.storage
        .from("imagenes-generadas")
        .getPublicUrl(storagePath);

      const publicUrl = dataPublicUrl && dataPublicUrl.publicUrl
        ? dataPublicUrl.publicUrl
        : null;

      const { error: errorInsert } = await supabase
        .from("registros_generacion")
        .insert([
          {
            user_id: usuario.id,
            coordenadas: coordenadas,
            ubicacion: ubicacion,
            fecha_texto: fechaTexto,
            hora_texto: horaTexto,
            nombre_archivo: nombreOriginal,
            storage_path: storagePath,
            public_url: publicUrl
          }
        ]);

      if (errorInsert) {
        console.error("Error al guardar registro en tabla:", errorInsert);
        mostrarMensaje("La imagen subio, pero fallo el registro");
        return false;
      }

      ultimoStoragePathGuardado = storagePath;
      ultimaPublicUrlGuardada = publicUrl;

      if (esAdminActual) {
        paginaActualAdmin = 1;
        await cargarHistorialAdmin();
        await cargarUsuariosAdmin();
      }

      return true;
    } catch (error) {
      console.error("Error general guardando imagen y registro:", error);
      mostrarMensaje("Ocurrio un error al guardar en Supabase");
      return false;
    }
  }

  function escaparHtml(valor) {
    return String(valor ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function textoErrorSupabase(error) {
    if (!error) return "Error desconocido";
    return error.message || error.details || error.hint || JSON.stringify(error);
  }

  function renderErrorSolicitudes(error) {
    const mensaje = textoErrorSupabase(error);

    if (!listaSolicitudesAdmin) return;

    listaSolicitudesAdmin.innerHTML = `
      <div style="padding:12px; border:1px solid #f1b0b7; background:#fff5f6; color:#9f1d2c; border-radius:10px;">
        <div style="font-weight:700; margin-bottom:6px;">Error al cargar solicitudes</div>
        <div style="font-size:13px; line-height:1.45;">${escaparHtml(mensaje)}</div>
      </div>
    `;

    actualizarResumenSolicitudes(0);
  }

  function renderErrorHistorial(error) {
    const mensaje = textoErrorSupabase(error);

    if (!historialAdmin) return;

    historialAdmin.innerHTML = `
      <div style="padding:12px; border:1px solid #f1b0b7; background:#fff5f6; color:#9f1d2c; border-radius:10px;">
        <div style="font-weight:700; margin-bottom:6px;">Error al cargar historial</div>
        <div style="font-size:13px; line-height:1.45;">${escaparHtml(mensaje)}</div>
      </div>
    `;

    actualizarResumenHistorial(0, 0, 0);
    ocultarPaginacionAdmin();
  }

  function renderErrorUsuarios(error) {
    const mensaje = textoErrorSupabase(error);

    if (!listaUsuariosAdmin) return;

    listaUsuariosAdmin.innerHTML = `
      <div style="padding:12px; border:1px solid #f1b0b7; background:#fff5f6; color:#9f1d2c; border-radius:10px;">
        <div style="font-weight:700; margin-bottom:6px;">Error al cargar usuarios</div>
        <div style="font-size:13px; line-height:1.45;">${escaparHtml(mensaje)}</div>
      </div>
    `;

    actualizarResumenUsuarios(0, 0, 0);
    ocultarPaginacionUsuariosAdmin();
  }

  async function obtenerMapaUsuariosPorIds(userIds) {
    const idsUnicos = [...new Set((userIds || []).filter(Boolean))];

    if (idsUnicos.length === 0) return {};

    const { data, error } = await supabase
      .from("profiles")
      .select("id, usuario")
      .in("id", idsUnicos);

    if (error || !data) {
      console.error("Error obteniendo usuarios del historial:", error);
      return {};
    }

    const mapa = {};
    data.forEach((item) => {
      mapa[item.id] = item.usuario || item.id;
    });

    return mapa;
  }

  async function consultarRegistrosConCreatedAt() {
    return await supabase
      .from("registros_generacion")
      .select("id, user_id, coordenadas, ubicacion, fecha_texto, hora_texto, nombre_archivo, storage_path, public_url, created_at")
      .order("created_at", { ascending: false });
  }

  async function consultarRegistrosSinCreatedAt() {
    return await supabase
      .from("registros_generacion")
      .select("id, user_id, coordenadas, ubicacion, fecha_texto, hora_texto, nombre_archivo, storage_path, public_url");
  }

  async function obtenerRegistrosAdminSeguro() {
    const intento1 = await consultarRegistrosConCreatedAt();

    if (!intento1.error) {
      return {
        data: intento1.data || [],
        error: null,
        usandoCreatedAt: true
      };
    }

    const mensaje1 = textoErrorSupabase(intento1.error).toLowerCase();

    const pareceFaltaCreatedAt =
      mensaje1.includes("created_at") &&
      (
        mensaje1.includes("column") ||
        mensaje1.includes("does not exist") ||
        mensaje1.includes("schema cache") ||
        mensaje1.includes("could not find")
      );

    if (!pareceFaltaCreatedAt) {
      return {
        data: null,
        error: intento1.error,
        usandoCreatedAt: false
      };
    }

    const intento2 = await consultarRegistrosSinCreatedAt();

    if (intento2.error) {
      return {
        data: null,
        error: intento2.error,
        usandoCreatedAt: false
      };
    }

    return {
      data: intento2.data || [],
      error: null,
      usandoCreatedAt: false
    };
  }

  function obtenerFechaComparableRegistro(registro) {
    if (registro?.fecha_texto && /^\d{4}-\d{2}-\d{2}$/.test(registro.fecha_texto)) {
      return registro.fecha_texto;
    }

    if (registro?.created_at) {
      const fecha = new Date(registro.created_at);
      if (!isNaN(fecha.getTime())) {
        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const dia = String(fecha.getDate()).padStart(2, "0");
        return `${anio}-${mes}-${dia}`;
      }
    }

    return "";
  }

  function aplicarFiltrosAdmin() {
    const textoUsuario = filtroUsuarioAdmin ? filtroUsuarioAdmin.value.trim().toLowerCase() : "";

    let fechaDesde = filtroFechaDesdeAdmin ? filtroFechaDesdeAdmin.value.trim() : "";
    let fechaHasta = filtroFechaHastaAdmin ? filtroFechaHastaAdmin.value.trim() : "";

    if ((!fechaDesde && !fechaHasta) && filtroFechaAdmin && filtroFechaAdmin.value.trim()) {
      fechaDesde = filtroFechaAdmin.value.trim();
      fechaHasta = filtroFechaAdmin.value.trim();
    }

    registrosAdminCache = registrosAdminOriginalCache.filter((registro) => {
      const nombreUsuario = String(registro.nombreUsuario || "").toLowerCase();
      const cumpleUsuario = !textoUsuario || nombreUsuario.includes(textoUsuario);

      const fechaRegistro = obtenerFechaComparableRegistro(registro);

      let cumpleDesde = true;
      let cumpleHasta = true;

      if (fechaDesde) {
        cumpleDesde = !!fechaRegistro && fechaRegistro >= fechaDesde;
      }

      if (fechaHasta) {
        cumpleHasta = !!fechaRegistro && fechaRegistro <= fechaHasta;
      }

      return cumpleUsuario && cumpleDesde && cumpleHasta;
    });

    paginaActualAdmin = 1;
    renderizarPaginaActualAdmin();
  }

  function aplicarFiltroUsuariosAdmin() {
    const texto = filtroUsuarioPanelAdmin
      ? filtroUsuarioPanelAdmin.value.trim().toLowerCase()
      : "";

    usuariosAdminCache = usuariosAdminOriginalCache.filter((usuario) => {
      const nombre = String(usuario.usuario || "").toLowerCase();
      const rol = String(usuario.rol || "").toLowerCase();

      if (rol === "admin" || nombre === "admin") {
        return false;
      }

      return !texto || nombre.includes(texto);
    });

    paginaActualUsuariosAdmin = 1;
    renderizarUsuariosAdmin();
  }

  async function descargarImagenDesdeUrl(url, nombreArchivo) {
    if (!url) {
      mostrarMensaje("No hay imagen para descargar");
      return;
    }

    try {
      const respuesta = await fetch(url);
      if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}`);
      }

      const blob = await respuesta.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = nombreArchivo || "imagen.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
      }, 1000);
    } catch (error) {
      console.error("Error descargando imagen del historial:", error);

      try {
        const link = document.createElement("a");
        link.href = url;
        link.download = nombreArchivo || "imagen.jpg";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error2) {
        console.error("Error en descarga alternativa:", error2);
        mostrarMensaje("No se pudo descargar la imagen");
      }
    }
  }

  function construirHtmlTarjetasHistorial(registros) {
    const iconoDescargar = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 20h14v-2H5v2zM11 4h2v8h3l-4 4-4-4h3V4z"/>
      </svg>
    `;

    const iconoEliminar = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 7h12l-1 14H7L6 7zm3-4h6l1 2h4v2H4V5h4l1-2z"/>
      </svg>
    `;

    return registros.map((registro) => {
      const imagenHtml = registro.public_url
        ? `
          <div class="tarjeta-registro-admin-imagen">
            <img src="${escaparHtml(registro.public_url)}" alt="Imagen del registro">
          </div>
        `
        : `
          <div class="tarjeta-registro-admin-vacia">Sin imagen</div>
        `;

      const botonDescargar = registro.public_url
        ? `
          <button
            type="button"
            class="btn-historial-accion btn-historial-descargar btn-descargar-registro"
            data-url="${escaparHtml(registro.public_url)}"
            data-nombre="${escaparHtml(registro.nombre_archivo || "imagen.jpg")}"
          >
            ${iconoDescargar}
            <span>Descargar</span>
          </button>
        `
        : `
          <button
            type="button"
            class="btn-historial-accion btn-historial-descargar"
            disabled
            style="opacity:0.65; cursor:not-allowed;"
          >
            ${iconoDescargar}
            <span>Descargar</span>
          </button>
        `;

      return `
        <div class="tarjeta-registro-admin">
          ${imagenHtml}

          <div class="tarjeta-registro-admin-texto">
            <div class="fila-info"><strong>Usuario:</strong> ${escaparHtml(registro.nombreUsuario || "-")}</div>
            <div class="fila-info"><strong>Ubicacion:</strong> ${escaparHtml(registro.ubicacion || "-")}</div>
            <div class="fila-info"><strong>Coordenadas:</strong> ${escaparHtml(registro.coordenadas || "-")}</div>
            <div class="fila-info"><strong>Fecha / hora app:</strong> ${escaparHtml(formatearFechaHoraRegistro(registro) || "-")}</div>
            <div class="fila-info"><strong>Creado en sistema:</strong> ${escaparHtml(formatearCreatedAt(registro.created_at) || "-")}</div>
            <div class="fila-info"><strong>Archivo:</strong> ${escaparHtml(registro.nombre_archivo || "-")}</div>
          </div>

          <div class="tarjeta-registro-admin-acciones">
            ${botonDescargar}
            <button
              type="button"
              class="btn-historial-accion btn-historial-eliminar btn-eliminar-registro"
              data-id="${escaparHtml(registro.id)}"
              data-storage-path="${escaparHtml(registro.storage_path || "")}"
            >
              ${iconoEliminar}
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  function obtenerInicialesUsuario(nombreUsuario) {
    const texto = String(nombreUsuario || "").trim();
    if (!texto) return "--";

    const partes = texto.split(/[\s._-]+/).filter(Boolean);
    if (partes.length >= 2) {
      return `${partes[0].charAt(0)}${partes[1].charAt(0)}`.toUpperCase();
    }

    return texto.slice(0, 2).toUpperCase();
  }

  function construirHtmlTarjetasUsuarios(usuarios) {
    const iconoDesactivarUsuario = `
      <span class="icono-boton" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M13 3h-2v10h2V3zm4.83 2.17-1.42 1.42A7 7 0 1 1 7.59 6.59L6.17 5.17A9 9 0 1 0 17.83 5.17z"/>
        </svg>
      </span>
    `;

    const iconoActivarUsuario = `
      <span class="icono-boton" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M13 3h-2v10h2V3zm4.83 2.17-1.42 1.42A7 7 0 1 1 7.59 6.59L6.17 5.17A9 9 0 1 0 17.83 5.17z"/>
        </svg>
      </span>
    `;

    const iconoDesvincularUsuario = `
      <span class="icono-boton" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M3.27 2 2 3.27l5.2 5.2-1.43 1.42a4 4 0 0 0 0 5.66l.7.71L4.34 16.4a2 2 0 1 0 2.83 2.83l2.12-2.12.71.71a4 4 0 0 0 5.66 0l1.42-1.42L20.73 22 22 20.73 3.27 2zm10.98 14.4a2 2 0 0 1-2.83 0l-4.24-4.24a2 2 0 0 1 0-2.83l1.43-1.42 7.07 7.07-1.43 1.42zM8.34 5.76l1.42 1.42.95-.95a2 2 0 0 1 2.83 0l.7.71 1.42-1.42-.7-.71a4 4 0 0 0-5.66 0l-.96.95zm6.6 6.6 1.42 1.42 1.87-1.87a4 4 0 0 0 0-5.66l-.7-.71-1.42 1.42.7.71a2 2 0 0 1 0 2.83l-1.87 1.86z"/>
        </svg>
      </span>
    `;

    return usuarios.map((usuario, index) => {
      const activo = usuario.activo === true;
      const esAdminFila = String(usuario.rol || "").toLowerCase() === "admin";
      const textoEstado = activo ? "Activo" : "Inactivo";
      const claseEstado = activo ? "estado-activo" : "estado-inactivo";
      const textoBoton = activo ? "Desactivar" : "Activar";
      const iconoBotonEstado = activo ? iconoDesactivarUsuario : iconoActivarUsuario;
      const claseBotonEstado = activo ? "btn-desactivar btn-usuario-desactivar" : "btn-activar btn-usuario-activar";
      const tieneInstalacion = usuario.tieneInstalacionActiva === true;
      const textoFechaVinculacion = usuario.fecha_vinculacion_texto ? usuario.fecha_vinculacion_texto : "-";
      const totalRegistros = Number(usuario.totalRegistros || 0);
      const iniciales = obtenerInicialesUsuario(usuario.usuario || "");
      const avatarVariantes = ["azul", "verde", "naranja", "gris", "morado"];
      const avatarClase = avatarVariantes[index % avatarVariantes.length];

      const botonToggle = esAdminFila
        ? ""
        : `
            <button
              type="button"
              class="btn-toggle-usuario-admin btn-accion-usuario-admin ${claseBotonEstado}"
              data-id="${escaparHtml(usuario.id)}"
              data-activo="${activo ? "true" : "false"}"
              data-usuario="${escaparHtml(usuario.usuario || "") }"
              data-accion="${activo ? "desactivar" : "activar"}"
            >
              ${iconoBotonEstado}
              <span>${textoBoton}</span>
            </button>
          `;

      const botonDesvincular = tieneInstalacion
        ? `
            <button
              type="button"
              class="btn-desvincular-dispositivo-admin btn-accion-usuario-admin btn-desvincular btn-usuario-desvincular"
              data-id="${escaparHtml(usuario.id)}"
              data-usuario="${escaparHtml(usuario.usuario || "") }"
              data-accion="desvincular"
            >
              ${iconoDesvincularUsuario}
              <span>Desvincular</span>
            </button>
          `
        : "";

      const bloqueAcciones = (botonToggle || botonDesvincular)
        ? `
          <div class="usuario-admin-acciones acciones-usuario">
            ${botonToggle}
            ${botonDesvincular}
          </div>
        `
        : "";

      return `
        <div class="tarjeta-usuario-admin usuario-admin-card" data-id="${escaparHtml(usuario.id || "")}" data-iniciales="${escaparHtml(iniciales)}">
          <div class="avatar-usuario avatar-${avatarClase}" aria-hidden="true">${escaparHtml(iniciales)}</div>

          <div class="usuario-admin-cabecera-card">
            <div class="usuario-nombre">${escaparHtml(usuario.usuario || "-")}</div>
            <span class="estado ${claseEstado}">${textoEstado}</span>
            <button
              type="button"
              class="btn-menu-usuario"
              data-id="${escaparHtml(usuario.id || "") }"
              data-usuario="${escaparHtml(usuario.usuario || "") }"
              aria-label="Opciones de usuario"
              title="Opciones de usuario"
            ></button>
          </div>

          <div class="tarjeta-usuario-admin-texto">
            <div class="fila-info"><strong>Rol:</strong><span>${escaparHtml(usuario.rol || "-")}</span></div>
            <div class="fila-info"><strong>Vinculado:</strong><span>${escaparHtml(textoFechaVinculacion)}</span></div>
            <div class="fila-info"><strong>Registros:</strong><span>${escaparHtml(totalRegistros)}</span></div>
          </div>

          ${bloqueAcciones}
        </div>
      `;
    }).join("");
  }

  function obtenerColorEstadoSolicitud(estado) {
    const valor = String(estado || "pendiente").toLowerCase();

    if (valor === "aprobado") {
      return { texto: "#1b5e20", fondo: "#e8f5e9", etiqueta: "Aprobado" };
    }

    if (valor === "rechazado") {
      return { texto: "#9f1d2c", fondo: "#fff5f6", etiqueta: "Rechazado" };
    }

    return { texto: "#0d47a1", fondo: "#e3f2fd", etiqueta: "Pendiente" };
  }

  function construirHtmlSolicitudesAdmin(solicitudes) {
    return (solicitudes || []).map((solicitud) => {
      const estadoUi = obtenerColorEstadoSolicitud(solicitud.estado);
      const puedeAprobar = String(solicitud.estado || "").toLowerCase() !== "aprobado";
      const puedeRechazar = String(solicitud.estado || "").toLowerCase() !== "rechazado";

      return `
        <div class="tarjeta-solicitud-admin">
          <div class="tarjeta-solicitud-admin-texto">
            <div><strong>Usuario:</strong> ${escaparHtml(solicitud.usuario || "-")}</div>
            <div><strong>Nombres:</strong> ${escaparHtml(solicitud.nombre_completo || "-")}</div>
            <div><strong>Clave solicitada:</strong> ${escaparHtml(solicitud.clave || "-")}</div>
            <div>
              <strong>Estado:</strong>
              <span style="display:inline-block; margin-left:6px; padding:4px 8px; border-radius:999px; background:${estadoUi.fondo}; color:${estadoUi.texto}; font-weight:700;">${estadoUi.etiqueta}</span>
            </div>
            <div><strong>Ultimo envio:</strong> ${escaparHtml(formatearCreatedAt(solicitud.updated_at || solicitud.created_at) || "-")}</div>
          </div>

          <div class="tarjeta-solicitud-admin-acciones">
            <button
              type="button"
              class="btn-solicitud-admin btn-aprobar-solicitud-admin"
              data-id="${escaparHtml(solicitud.id || "")}"
              data-usuario="${escaparHtml(solicitud.usuario || "")}"
              ${puedeAprobar ? "" : `disabled style="opacity:0.65;cursor:not-allowed;"`}
            >
              Aprobar
            </button>
            <button
              type="button"
              class="btn-solicitud-admin btn-rechazar-solicitud-admin"
              data-id="${escaparHtml(solicitud.id || "")}"
              data-usuario="${escaparHtml(solicitud.usuario || "")}"
              ${puedeRechazar ? "" : `disabled style="opacity:0.65;cursor:not-allowed;"`}
            >
              Rechazar
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  function renderizarSolicitudesAdmin() {
    if (!listaSolicitudesAdmin) return;

    if (!solicitudesAdminCache.length) {
      listaSolicitudesAdmin.innerHTML = "<p style='padding:10px;'>No hay solicitudes registradas</p>";
      actualizarResumenSolicitudes(0);
      return;
    }

    listaSolicitudesAdmin.innerHTML = construirHtmlSolicitudesAdmin(solicitudesAdminCache);
    actualizarResumenSolicitudes(solicitudesAdminCache.length);
  }

  function actualizarControlesPaginacionAdmin() {
    const totalRegistros = registrosAdminCache.length;
    const totalPaginas = Math.max(1, Math.ceil(totalRegistros / REGISTROS_POR_PAGINA));

    if (totalRegistros === 0) {
      ocultarPaginacionAdmin();
      return;
    }

    if (paginaActualAdmin > totalPaginas) paginaActualAdmin = totalPaginas;
    if (paginaActualAdmin < 1) paginaActualAdmin = 1;

    mostrarPaginacionAdmin();

    if (infoPaginaAdmin) {
      infoPaginaAdmin.textContent = `Pagina ${paginaActualAdmin} de ${totalPaginas}`;
    }

    if (btnPaginaAnterior) {
      const deshabilitado = paginaActualAdmin <= 1;
      btnPaginaAnterior.disabled = deshabilitado;
      btnPaginaAnterior.style.opacity = deshabilitado ? "0.6" : "1";
      btnPaginaAnterior.style.cursor = deshabilitado ? "not-allowed" : "pointer";
    }

    if (btnPaginaSiguiente) {
      const deshabilitado = paginaActualAdmin >= totalPaginas;
      btnPaginaSiguiente.disabled = deshabilitado;
      btnPaginaSiguiente.style.opacity = deshabilitado ? "0.6" : "1";
      btnPaginaSiguiente.style.cursor = deshabilitado ? "not-allowed" : "pointer";
    }
  }

  function renderizarPaginaActualAdmin() {
    if (!historialAdmin) return;

    const totalRegistros = registrosAdminCache.length;

    if (!totalRegistros) {
      historialAdmin.innerHTML = "<p style='padding:10px;'>No hay registros para los filtros aplicados</p>";
      actualizarResumenHistorial(0, 0, 0);
      ocultarPaginacionAdmin();
      return;
    }

    const totalPaginas = Math.max(1, Math.ceil(totalRegistros / REGISTROS_POR_PAGINA));

    if (paginaActualAdmin > totalPaginas) paginaActualAdmin = totalPaginas;
    if (paginaActualAdmin < 1) paginaActualAdmin = 1;

    const inicio = (paginaActualAdmin - 1) * REGISTROS_POR_PAGINA;
    const fin = inicio + REGISTROS_POR_PAGINA;
    const registrosPagina = registrosAdminCache.slice(inicio, fin);

    historialAdmin.innerHTML = construirHtmlTarjetasHistorial(registrosPagina);

    const inicioHumano = inicio + 1;
    const finHumano = inicio + registrosPagina.length;

    actualizarResumenHistorial(totalRegistros, inicioHumano, finHumano);
    actualizarControlesPaginacionAdmin();
  }

  function actualizarControlesPaginacionUsuariosAdmin() {
    const totalUsuarios = usuariosAdminCache.length;
    const totalPaginas = Math.max(1, Math.ceil(totalUsuarios / USUARIOS_POR_PAGINA));

    if (totalUsuarios === 0) {
      ocultarPaginacionUsuariosAdmin();
      return;
    }

    if (paginaActualUsuariosAdmin > totalPaginas) paginaActualUsuariosAdmin = totalPaginas;
    if (paginaActualUsuariosAdmin < 1) paginaActualUsuariosAdmin = 1;

    mostrarPaginacionUsuariosAdmin();

    if (infoPaginaUsuariosAdmin) {
      infoPaginaUsuariosAdmin.textContent = `Pagina ${paginaActualUsuariosAdmin} de ${totalPaginas}`;
    }

    if (btnPaginaAnteriorUsuarios) {
      const deshabilitado = paginaActualUsuariosAdmin <= 1;
      btnPaginaAnteriorUsuarios.disabled = deshabilitado;
      btnPaginaAnteriorUsuarios.style.opacity = deshabilitado ? "0.6" : "1";
      btnPaginaAnteriorUsuarios.style.cursor = deshabilitado ? "not-allowed" : "pointer";
    }

    if (btnPaginaSiguienteUsuarios) {
      const deshabilitado = paginaActualUsuariosAdmin >= totalPaginas;
      btnPaginaSiguienteUsuarios.disabled = deshabilitado;
      btnPaginaSiguienteUsuarios.style.opacity = deshabilitado ? "0.6" : "1";
      btnPaginaSiguienteUsuarios.style.cursor = deshabilitado ? "not-allowed" : "pointer";
    }
  }

  function renderizarUsuariosAdmin() {
    if (!listaUsuariosAdmin) return;

    const total = usuariosAdminCache.length;

    if (!total) {
      listaUsuariosAdmin.innerHTML = "<p style='padding:10px;'>No hay usuarios para la busqueda aplicada</p>";
      actualizarResumenUsuarios(0, 0, 0);
      ocultarPaginacionUsuariosAdmin();
      return;
    }

    const totalPaginas = Math.max(1, Math.ceil(total / USUARIOS_POR_PAGINA));

    if (paginaActualUsuariosAdmin > totalPaginas) paginaActualUsuariosAdmin = totalPaginas;
    if (paginaActualUsuariosAdmin < 1) paginaActualUsuariosAdmin = 1;

    const inicio = (paginaActualUsuariosAdmin - 1) * USUARIOS_POR_PAGINA;
    const fin = inicio + USUARIOS_POR_PAGINA;
    const usuariosPagina = usuariosAdminCache.slice(inicio, fin);

    listaUsuariosAdmin.innerHTML = construirHtmlTarjetasUsuarios(usuariosPagina);

    const inicioHumano = inicio + 1;
    const finHumano = inicio + usuariosPagina.length;

    actualizarResumenUsuarios(total, inicioHumano, finHumano);
    actualizarControlesPaginacionUsuariosAdmin();
  }

  async function cargarHistorialAdmin() {
    if (!esAdminActual) {
      ocultarPanelAdmin();
      return;
    }

    if (!historialAdmin || cargandoHistorialAdmin) return;

    cargandoHistorialAdmin = true;
    historialAdmin.innerHTML = "<p style='padding:10px;'>Cargando historial...</p>";
    actualizarResumenHistorial(0, 0, 0);
    ocultarPaginacionAdmin();

    try {
      const resultado = await obtenerRegistrosAdminSeguro();

      if (resultado.error) {
        console.error("Error cargando historial admin:", resultado.error);
        renderErrorHistorial(resultado.error);
        return;
      }

      let registros = Array.isArray(resultado.data) ? resultado.data.slice() : [];

      if (!resultado.usandoCreatedAt) {
        registros.reverse();
      }

      if (!registros || registros.length === 0) {
        registrosAdminOriginalCache = [];
        registrosAdminCache = [];
        paginaActualAdmin = 1;
        historialAdmin.innerHTML = "<p style='padding:10px;'>No hay registros todavia</p>";
        actualizarResumenHistorial(0, 0, 0);
        ocultarPaginacionAdmin();
        return;
      }

      const mapaUsuarios = await obtenerMapaUsuariosPorIds(registros.map((r) => r.user_id));

      registrosAdminOriginalCache = registros.map((registro) => {
        return {
          ...registro,
          nombreUsuario: mapaUsuarios[registro.user_id] || registro.user_id || "-"
        };
      });

      aplicarFiltrosAdmin();
    } catch (err) {
      console.error("Error general cargando historial admin:", err);
      renderErrorHistorial(err);
    } finally {
      cargandoHistorialAdmin = false;
    }
  }

  async function cargarSolicitudesAdmin() {
    if (!esAdminActual || !listaSolicitudesAdmin || cargandoSolicitudesAdmin) return;

    cargandoSolicitudesAdmin = true;
    listaSolicitudesAdmin.innerHTML = "<p style='padding:10px;'>Cargando solicitudes...</p>";
    actualizarResumenSolicitudes(0);

    try {
      const { data, error } = await supabase
        .from("solicitudes_acceso")
        .select("id, usuario, clave, nombre_completo, estado, created_at, updated_at, auth_user_id")
        .eq("estado", "pendiente")
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error cargando solicitudes:", error);
        renderErrorSolicitudes(error);
        return;
      }

      solicitudesAdminCache = data || [];
      renderizarSolicitudesAdmin();
    } catch (err) {
      console.error("Error general cargando solicitudes:", err);
      renderErrorSolicitudes(err);
    } finally {
      cargandoSolicitudesAdmin = false;
    }
  }

  async function cargarUsuariosAdmin() {
    if (!esAdminActual || !listaUsuariosAdmin || cargandoUsuariosAdmin) return;

    cargandoUsuariosAdmin = true;
    listaUsuariosAdmin.innerHTML = "<p style='padding:10px;'>Cargando usuarios...</p>";
    actualizarResumenUsuarios(0, 0, 0);
    ocultarPaginacionUsuariosAdmin();

    try {
      const { data: perfiles, error: errorPerfiles } = await supabase
        .from("profiles")
        .select("id, usuario, activo, rol")
        .order("usuario", { ascending: true });

      if (errorPerfiles) {
        console.error("Error cargando usuarios:", errorPerfiles);
        renderErrorUsuarios(errorPerfiles);
        return;
      }

      const { data: registros, error: errorRegistros } = await supabase
        .from("registros_generacion")
        .select("user_id");

      if (errorRegistros) {
        console.error("Error cargando conteo de registros por usuario:", errorRegistros);
        renderErrorUsuarios(errorRegistros);
        return;
      }

      const conteo = {};
      (registros || []).forEach((item) => {
        const key = item.user_id;
        conteo[key] = (conteo[key] || 0) + 1;
      });

      const { data: instalaciones, error: errorInstalaciones } = await supabase
        .from("instalaciones_usuario")
        .select("id, user_id, installation_id, device_info, activo, created_at, updated_at")
        .eq("activo", true);

      if (errorInstalaciones) {
        console.error("Error cargando instalaciones por usuario:", errorInstalaciones);
        renderErrorUsuarios(errorInstalaciones);
        return;
      }

      const mapaInstalaciones = {};
      (instalaciones || []).forEach((instalacion) => {
        if (!instalacion || !instalacion.user_id) return;
        mapaInstalaciones[instalacion.user_id] = instalacion;
      });

      usuariosAdminOriginalCache = (perfiles || [])
        .filter((perfil) => String(perfil?.rol || "").toLowerCase() !== "admin")
        .map((perfil) => {
          const instalacion = mapaInstalaciones[perfil.id] || null;

          return {
            ...perfil,
            totalRegistros: conteo[perfil.id] || 0,
            tieneInstalacionActiva: !!instalacion,
            installation_id: instalacion ? instalacion.installation_id : "",
            device_info: instalacion ? instalacion.device_info : "",
            fecha_vinculacion: instalacion ? instalacion.created_at : "",
            fecha_vinculacion_texto: instalacion ? formatearCreatedAt(instalacion.created_at) : "-",
            instalacion_id_tabla: instalacion ? instalacion.id : ""
          };
        });

      aplicarFiltroUsuariosAdmin();
    } catch (err) {
      console.error("Error general cargando usuarios:", err);
      renderErrorUsuarios(err);
    } finally {
      cargandoUsuariosAdmin = false;
    }
  }

  function obtenerFechaSolo(valor) {
    if (!valor) return "";

    if (/^\d{4}-\d{2}-\d{2}$/.test(String(valor))) {
      return String(valor);
    }

    const fecha = new Date(valor);
    if (isNaN(fecha.getTime())) return "";

    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
  }

  function cumpleFiltroFechaActividad(valorFecha) {
    const fecha = obtenerFechaSolo(valorFecha);
    const desde = filtroFechaDesdeActividadAdmin ? String(filtroFechaDesdeActividadAdmin.value || "").trim() : "";
    const hasta = filtroFechaHastaActividadAdmin ? String(filtroFechaHastaActividadAdmin.value || "").trim() : "";

    if (!fecha) return !desde && !hasta;
    if (desde && fecha < desde) return false;
    if (hasta && fecha > hasta) return false;
    return true;
  }

  function obtenerHistorialActividadOrdenadoYFiltrado(userId, historial) {
    const orden = ordenActividadDetalleCache[userId] === "asc" ? "asc" : "desc";
    const items = Array.isArray(historial) ? historial.filter((fila) => cumpleFiltroFechaActividad(fila && fila.fecha_hora_ingreso)) : [];

    items.sort((a, b) => {
      const fechaA = a && a.fecha_hora_ingreso ? new Date(a.fecha_hora_ingreso).getTime() : 0;
      const fechaB = b && b.fecha_hora_ingreso ? new Date(b.fecha_hora_ingreso).getTime() : 0;
      return orden === "asc" ? fechaA - fechaB : fechaB - fechaA;
    });

    return items;
  }

  function obtenerEtiquetaOrdenActividad(userId) {
    return ordenActividadDetalleCache[userId] === "asc" ? "Orden: antiguos" : "Orden: recientes";
  }

  function obtenerHtmlDetalleActividad(item) {
    const claveActividad = obtenerClaveActividad(item);
    const historial = historialActividadCache[claveActividad];
    const abierto = detalleActividadExpandidoUserId === claveActividad;
    const textoBoton = abierto ? 'Ocultar actividad' : 'Ver actividad';
    const estadoDetalle = obtenerEstadoTarjetaActividad(item);
    const claseBotonEstado = estadoDetalle.tipo === "fallido" ? "btn-actividad-detalle-fallido" : (Number(item.total_fallidos || 0) > 0 ? "btn-actividad-detalle-alerta" : "btn-actividad-detalle-exito");

    let detalleHtml = '';

    if (abierto) {
      if (historial === null) {
        detalleHtml = '<div class="actividad-admin-detalle"><div class="actividad-admin-detalle-vacio">Cargando actividad...</div></div>';
      } else {
        const historialOrdenado = obtenerHistorialActividadOrdenadoYFiltrado(claveActividad, historial);
        const etiquetaOrden = obtenerEtiquetaOrdenActividad(claveActividad);
        const bloqueCabecera = `
          <div class="actividad-admin-detalle-cabecera">
            <div class="actividad-admin-detalle-titulo">Historial de actividad</div>
            <button type="button" class="btn-actividad-orden" data-user-id="${escapeHtml(claveActividad)}">${etiquetaOrden}</button>
          </div>
        `;

        if (!historialOrdenado.length) {
          detalleHtml = `<div class="actividad-admin-detalle">${bloqueCabecera}<div class="actividad-admin-detalle-vacio">No hay ingresos detallados registrados</div></div>`;
        } else {
          detalleHtml = `
            <div class="actividad-admin-detalle">
              ${bloqueCabecera}
              <div class="actividad-admin-detalle-lista">
                ${historialOrdenado.map((fila) => {
                  const fechaHora = fila.fecha_hora_ingreso ? formatearCreatedAt(fila.fecha_hora_ingreso) : '-';
                  const esFallido = String(fila.tipo || '').toLowerCase() === 'fallido';
                  const tituloEvento = esFallido ? 'Ingreso fallido' : 'Ingreso exitoso';
                  const claseEvento = esFallido ? 'actividad-evento-fallido' : 'actividad-evento-ingreso';
                  const motivo = esFallido && fila.motivo ? `<div class="actividad-evento-motivo">${escapeHtml(String(fila.motivo).replace(/_/g, ' '))}</div>` : '';

                  return `
                    <div class="actividad-evento ${claseEvento}">
                      <div class="actividad-evento-linea"></div>
                      <div class="actividad-evento-icono">
                        ${esFallido
                          ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>`
                          : `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>`}
                      </div>
                      <div class="actividad-evento-contenido">
                        <div class="actividad-evento-titulo">${tituloEvento}</div>
                        <div class="actividad-evento-fecha">${fechaHora}</div>
                        ${motivo}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }
      }
    }

    return detalleHtml;
  }

  async function cargarHistorialActividadPorUsuario(claveActividad) {
    historialActividadCache[claveActividad] = null;
    renderizarActividadAdmin();

    const itemActividad = actividadAdminCache.find((item) => obtenerClaveActividad(item) === claveActividad) || null;
    const userId = itemActividad && itemActividad.user_id ? itemActividad.user_id : null;
    const usuario = itemActividad && itemActividad.usuario ? itemActividad.usuario : "";

    try {
      const consultas = [];

      if (userId) {
        consultas.push(
          supabase
            .from("actividad_sistema_historial")
            .select("id, user_id, usuario, fecha_hora_ingreso, tipo, motivo")
            .eq("user_id", userId)
            .order("fecha_hora_ingreso", { ascending: false })
        );
      }

      if (usuario) {
        consultas.push(
          supabase
            .from("actividad_sistema_historial")
            .select("id, user_id, usuario, fecha_hora_ingreso, tipo, motivo")
            .eq("usuario", usuario)
            .order("fecha_hora_ingreso", { ascending: false })
        );
      }

      const respuestas = consultas.length ? await Promise.all(consultas) : [];

      const registrosMap = new Map();

      for (const respuesta of respuestas) {
        if (respuesta.error) {
          console.error("Error cargando detalle de actividad:", respuesta.error);
          historialActividadCache[claveActividad] = [];
          renderizarActividadAdmin();
          return;
        }

        (respuesta.data || []).forEach((fila) => {
          if (!fila) return;
          const llave = fila.id ? String(fila.id) : `${fila.user_id || "sin_user"}|${fila.usuario || ""}|${fila.fecha_hora_ingreso || ""}|${fila.tipo || ""}|${fila.motivo || ""}`;
          if (!registrosMap.has(llave)) {
            registrosMap.set(llave, fila);
          }
        });
      }

      historialActividadCache[claveActividad] = Array.from(registrosMap.values());
      renderizarActividadAdmin();
      actualizarResumenGeneralAdmin();
    } catch (error) {
      console.error("Error general cargando detalle de actividad:", error);
      historialActividadCache[claveActividad] = [];
      renderizarActividadAdmin();
    }
  }

  async function toggleDetalleActividadAdmin(claveActividad) {
    if (!claveActividad) return;

    if (detalleActividadExpandidoUserId === claveActividad) {
      detalleActividadExpandidoUserId = null;
      renderizarActividadAdmin();
      return;
    }

    detalleActividadExpandidoUserId = claveActividad;

    if (!ordenActividadDetalleCache[claveActividad]) {
      ordenActividadDetalleCache[claveActividad] = "desc";
    }

    await cargarHistorialActividadPorUsuario(claveActividad);
  }

  
  function formatearFechaHoraActividadSistema(valor) {
    if (!valor) return "-";

    try {
      const fecha = new Date(valor);
      if (!Number.isNaN(fecha.getTime())) {
        const dia = String(fecha.getDate()).padStart(2, "0");
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const anio = fecha.getFullYear();
        const hora = String(fecha.getHours()).padStart(2, "0");
        const minuto = String(fecha.getMinutes()).padStart(2, "0");
        const segundo = String(fecha.getSeconds()).padStart(2, "0");
        return `${dia}/${mes}/${anio} ${hora}:${minuto}:${segundo}`;
      }
    } catch (error) {}

    const texto = String(valor || "");
    if (/^\d{4}-\d{2}-\d{2}/.test(texto)) {
      const fechaParte = texto.slice(0, 10);
      const horaParte = texto.length >= 19 ? texto.slice(11, 19) : "";
      const [anio, mes, dia] = fechaParte.split("-");
      return `${dia}/${mes}/${anio}${horaParte ? " " + horaParte : ""}`;
    }

    return texto || "-";
  }

function formatearFechaHoraResumenAdmin() {
    const ahora = new Date();
    const dia = String(ahora.getDate()).padStart(2, "0");
    const mes = String(ahora.getMonth() + 1).padStart(2, "0");
    const hora = String(ahora.getHours()).padStart(2, "0");
    const minuto = String(ahora.getMinutes()).padStart(2, "0");
    return `Hoy ${dia}/${mes} ${hora}:${minuto}`;
  }

  function actualizarResumenGeneralAdmin() {
    const fechaHoraResumenAdmin = document.getElementById("fechaHoraResumenAdmin");
    const resumenTotalImagenes = document.getElementById("resumenTotalImagenes");
    const resumenTotalAccesos = document.getElementById("resumenTotalAccesos");
    const resumenTotalUsuarios = document.getElementById("resumenTotalUsuarios");
    const resumenUltimoUsuario = document.getElementById("resumenUltimoUsuario");

    if (fechaHoraResumenAdmin) {
      fechaHoraResumenAdmin.innerHTML = `<span class="icono-resumen-fecha">◷</span> ${formatearFechaHoraResumenAdmin()}`;
    }

    const totalImagenes = Array.isArray(registrosAdminOriginalCache) ? registrosAdminOriginalCache.length : 0;
    const usuariosNoAdmin = Array.isArray(usuariosAdminOriginalCache)
      ? usuariosAdminOriginalCache.filter((u) => u && String(u.rol || "").toLowerCase() !== "admin")
      : [];
    const totalUsuarios = usuariosNoAdmin.filter((u) => u && u.activo === true).length;

    const actividadNoAdmin = Array.isArray(actividadAdminCache)
      ? actividadAdminCache.filter((item) => item && String(item.usuario || "").toLowerCase() !== "admin")
      : [];

    const totalAccesos = actividadNoAdmin.reduce((s, item) => s + Number(item?.contador_ingresos || 0), 0);

    const ultimoItem = actividadNoAdmin
      .slice()
      .sort((a, b) => {
        const ea = obtenerUltimoEventoActividad(a);
        const eb = obtenerUltimoEventoActividad(b);
        const ta = ea?.fecha_hora_ingreso ? new Date(ea.fecha_hora_ingreso).getTime() : 0;
        const tb = eb?.fecha_hora_ingreso ? new Date(eb.fecha_hora_ingreso).getTime() : 0;
        return tb - ta;
      })[0];

    const ultimo = ultimoItem && ultimoItem.usuario ? ultimoItem.usuario : "-";

    if (resumenTotalImagenes) resumenTotalImagenes.textContent = totalImagenes;
    if (resumenTotalAccesos) resumenTotalAccesos.textContent = totalAccesos;
    if (resumenTotalUsuarios) resumenTotalUsuarios.textContent = totalUsuarios;
    if (resumenUltimoUsuario) resumenUltimoUsuario.textContent = ultimo;
  }

  function obtenerInicialesActividad(nombre) {
    const limpio = String(nombre || "-").trim();
    if (!limpio || limpio === "-") return "--";
    const partes = limpio.split(/\s+/).filter(Boolean);
    if (partes.length >= 2) {
      return `${partes[0][0] || ""}${partes[1][0] || ""}`.toUpperCase();
    }
    return limpio.slice(0, 2).toUpperCase();
  }

  function colorAvatarActividad(nombre) {
    const colores = [
      "linear-gradient(180deg, #1f8bff 0%, #075bd8 100%)",
      "linear-gradient(180deg, #19a44a 0%, #087a39 100%)",
      "linear-gradient(180deg, #ff7a1a 0%, #f05a00 100%)",
      "linear-gradient(180deg, #5a6b7d 0%, #334155 100%)",
      "linear-gradient(180deg, #a020d0 0%, #7b149e 100%)",
      "linear-gradient(180deg, #ef3340 0%, #d7192e 100%)"
    ];
    const texto = String(nombre || "");
    let suma = 0;
    for (let i = 0; i < texto.length; i++) suma += texto.charCodeAt(i);
    return colores[suma % colores.length];
  }

  function renderizarActividadAdmin() {
    if (!listaActividadAdmin) return;

    const lista = Array.isArray(actividadAdminCache)
      ? actividadAdminCache.filter((item) => item && normalizarUsuarioSolicitud(item.usuario || "") !== "admin")
      : [];

    actualizarResumenActividad(lista.length);

    if (!lista.length) {
      listaActividadAdmin.innerHTML = "<p style='padding:10px;'>No hay registros de actividad</p>";
      return;
    }

    listaActividadAdmin.innerHTML = lista.map((item) => {
      const clave = obtenerClaveActividad(item);
      const usuario = item.usuario || "-";
      const estado = obtenerEstadoTarjetaActividad(item);
      const totalIngresos = Number(item.contador_ingresos || item.total_ingresos || 0);
      const totalFallidos = Number(item.total_fallidos || 0);
      const ultimoEvento = obtenerUltimoEventoActividad(item);
      const esFallido = String(ultimoEvento?.tipo || "").toLowerCase() === "fallido";
      const etiquetaFecha = esFallido ? "Último intento:" : "Último ingreso:";
      const fechaEvento = ultimoEvento?.fecha_hora_ingreso
        ? formatearFechaHoraActividadSistema(ultimoEvento.fecha_hora_ingreso)
        : "-";
      const iniciales = obtenerInicialesActividad(usuario);
      const avatarColor = colorAvatarActividad(usuario);

      return `
        <div class="tarjeta-actividad-admin" data-actividad-clave="${escaparHtml(clave)}" data-user-id="${escaparHtml(item.user_id || "")}" data-usuario="${escaparHtml(usuario)}">
          <div class="tarjeta-actividad-avatar" style="background:${avatarColor};">${escaparHtml(iniciales)}</div>
          <div class="tarjeta-actividad-contenido">
            <h3 class="actividad-nombre">${escaparHtml(usuario)}</h3>
            <div class="tarjeta-actividad-info">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V2zm13 8H4v10h16V10z"/></svg>
              <span>${escaparHtml(etiquetaFecha)}</span>
              <strong>${escaparHtml(fechaEvento)}</strong>
            </div>
            <div class="tarjeta-actividad-info">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h16v2H4v-2zM6 10h3v7H6v-7zm5-5h3v12h-3V5zm5 8h3v4h-3v-4z"/></svg>
              <span>Resumen:</span>
              <strong>${totalIngresos} ingresos · ${totalFallidos} fallidos</strong>
            </div>
            <button type="button" class="btn-ver-actividad" data-clave="${escaparHtml(clave)}">
              ${detalleActividadExpandidoUserId === clave ? "Ocultar actividad" : "Ver actividad"}
              <span aria-hidden="true">›</span>
            </button>
          </div>
          <span class="tarjeta-actividad-admin-pill ${estado.clase}">${escaparHtml(estado.texto)}</span>
          <button type="button" class="btn-menu-actividad" data-clave="${escaparHtml(clave)}" data-user-id="${escaparHtml(item.user_id || "")}" data-usuario="${escaparHtml(usuario)}" aria-label="Opciones"></button>
        </div>
      `;
    }).join("");

    if (detalleActividadExpandidoUserId) {
      const tarjeta = Array.from(listaActividadAdmin.querySelectorAll(".tarjeta-actividad-admin"))
        .find((el) => el.dataset.actividadClave === detalleActividadExpandidoUserId);

      const itemDetalle = lista.find((item) => obtenerClaveActividad(item) === detalleActividadExpandidoUserId) || null;
      const cacheExiste = Object.prototype.hasOwnProperty.call(historialActividadCache, detalleActividadExpandidoUserId);

      if (tarjeta && itemDetalle && cacheExiste) {
        const detalle = document.createElement("div");
        detalle.className = "detalle-actividad-admin";
        detalle.innerHTML = obtenerHtmlDetalleActividad(itemDetalle);
        tarjeta.appendChild(detalle);
      }
    }
  }

  async function cargarActividadAdmin() {
    if (!esAdminActual || !listaActividadAdmin || cargandoActividadAdmin) return;

    cargandoActividadAdmin = true;
    listaActividadAdmin.innerHTML = '<div class="actividad-admin-cargando">Cargando actividad...</div>';
    actualizarResumenActividad(0);

    try {
      const [{ data: perfiles, error: errorPerfiles }, { data: actividad, error: errorActividad }, { data: historial, error: errorHistorial }] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, usuario, rol"),
        supabase
          .from("actividad_sistema")
          .select("user_id, usuario, fecha_ingreso, hora_ingreso, ultima_conexion, contador_ingresos")
          .order("ultima_conexion", { ascending: false }),
        supabase
          .from("actividad_sistema_historial")
          .select("id, user_id, usuario, fecha_hora_ingreso, tipo, motivo")
          .order("fecha_hora_ingreso", { ascending: false })
      ]);

      if (errorPerfiles || errorActividad || errorHistorial) {
        console.error("Error cargando actividad del sistema:", errorPerfiles || errorActividad || errorHistorial);
        listaActividadAdmin.innerHTML = '<div class="actividad-admin-error">No se pudo cargar la actividad del sistema</div>';
        return;
      }

      const perfilesAdmin = (perfiles || []).filter((perfil) => {
        const rol = String(perfil?.rol || "").toLowerCase();
        const usuario = normalizarUsuarioSolicitud(perfil?.usuario || "");
        return rol === "admin" || usuario === "admin";
      });

      const idsAdmin = new Set(perfilesAdmin.map((perfil) => String(perfil.id)));

      const perfilesNoAdmin = (perfiles || []).filter((perfil) => {
        const rol = String(perfil?.rol || "").toLowerCase();
        const usuario = normalizarUsuarioSolicitud(perfil?.usuario || "");
        return rol !== "admin" && usuario !== "admin";
      });

      const idsNoAdmin = new Set(perfilesNoAdmin.map((perfil) => String(perfil.id)));
      const usuariosNoAdmin = new Set(perfilesNoAdmin.map((perfil) => normalizarUsuarioSolicitud(perfil.usuario || "")));

      const mapaUsuariosPorId = {};
      const mapaPerfilesPorUsuario = {};
      perfilesNoAdmin.forEach((perfil) => {
        if (!perfil || !perfil.id) return;
        mapaUsuariosPorId[perfil.id] = perfil.usuario || '';
        const llaveUsuario = normalizarUsuarioSolicitud(perfil.usuario || '');
        if (llaveUsuario) {
          mapaPerfilesPorUsuario[llaveUsuario] = perfil;
        }
      });

      const mapaActividad = new Map();

      (actividad || []).forEach((item) => {
        if (!item || !item.user_id || !idsNoAdmin.has(String(item.user_id))) return;

        mapaActividad.set(String(item.user_id), {
          user_id: item.user_id,
          usuario: mapaUsuariosPorId[item.user_id] || item.usuario || '-',
          fecha_ingreso: item.fecha_ingreso || '',
          hora_ingreso: item.hora_ingreso || '',
          ultima_conexion: item.ultima_conexion || '',
          contador_ingresos: Number(item.contador_ingresos || 0),
          total_fallidos: 0,
          ultimo_intento: item.ultima_conexion || '',
          ultimo_tipo: item.ultima_conexion ? 'exitoso' : '',
          ultimo_motivo: ''
        });
      });

      (historial || []).forEach((fila) => {
        if (!fila) return;

        const userId = fila.user_id ? String(fila.user_id) : '';
        const usuarioFila = String(fila.usuario || '').trim();
        const usuarioNormalizado = normalizarUsuarioSolicitud(usuarioFila);

        // No mostrar ni contar actividad del admin.
        if (usuarioNormalizado === "admin") return;
        if (userId && idsAdmin.has(userId)) return;

        const perfilRelacionado = userId ? null : mapaPerfilesPorUsuario[usuarioNormalizado];

        // Los intentos fallidos de usuarios no registrados SI deben mostrarse.
        const clave = userId || (perfilRelacionado && perfilRelacionado.id ? String(perfilRelacionado.id) : `usuario:${usuarioNormalizado || usuarioFila || 'desconocido'}`);

        if (!mapaActividad.has(clave)) {
          mapaActividad.set(clave, {
            user_id: perfilRelacionado && perfilRelacionado.id ? perfilRelacionado.id : (userId || null),
            usuario: (perfilRelacionado && perfilRelacionado.usuario) || usuarioFila || '-',
            fecha_ingreso: '',
            hora_ingreso: '',
            ultima_conexion: '',
            contador_ingresos: 0,
            total_fallidos: 0,
            ultimo_intento: '',
            ultimo_tipo: '',
            ultimo_motivo: ''
          });
        }

        const itemActual = mapaActividad.get(clave);
        const tipoEvento = String(fila.tipo || 'exitoso').toLowerCase();

        if (tipoEvento === 'fallido') {
          itemActual.total_fallidos = Number(itemActual.total_fallidos || 0) + 1;
        }

        const marcaTiempoFila = fila.fecha_hora_ingreso ? new Date(fila.fecha_hora_ingreso).getTime() : 0;
        const marcaTiempoActual = itemActual.ultimo_intento ? new Date(itemActual.ultimo_intento).getTime() : 0;

        if (!itemActual.ultimo_intento || marcaTiempoFila > marcaTiempoActual) {
          itemActual.ultimo_intento = fila.fecha_hora_ingreso || '';
          itemActual.ultimo_tipo = tipoEvento || 'exitoso';
          itemActual.ultimo_motivo = fila.motivo || '';
        }

        mapaActividad.set(clave, itemActual);
      });

      actividadAdminCache = Array.from(mapaActividad.values()).sort((a, b) => {
        const fechaA = obtenerUltimoEventoActividad(a)?.fecha_hora_ingreso ? new Date(obtenerUltimoEventoActividad(a).fecha_hora_ingreso).getTime() : 0;
        const fechaB = obtenerUltimoEventoActividad(b)?.fecha_hora_ingreso ? new Date(obtenerUltimoEventoActividad(b).fecha_hora_ingreso).getTime() : 0;
        return fechaB - fechaA;
      });

      detalleActividadExpandidoUserId = null;
      historialActividadCache = {};
      ordenActividadDetalleCache = {};
      resumenIntentosActividadCache = {};
      renderizarActividadAdmin();
    } catch (error) {
      console.error("Error general cargando actividad del sistema:", error);
      listaActividadAdmin.innerHTML = '<div class="actividad-admin-error">No se pudo cargar la actividad del sistema</div>';
      actualizarResumenActividad(0);
    } finally {
      cargandoActividadAdmin = false;
    }
  }

  async function enviarSolicitudAcceso() {
    const usuario = normalizarUsuarioSolicitud(usuarioSolicitud ? usuarioSolicitud.value : "");
    const clave = String(claveSolicitud ? claveSolicitud.value : "").trim();
    const nombreCompleto = String(nombreCompletoSolicitud ? nombreCompletoSolicitud.value : "").trim();

    if (!usuario || !clave || !nombreCompleto) {
      if (mensajeSolicitud) {
        mensajeSolicitud.textContent = "Complete usuario, clave y nombres completos";
        mensajeSolicitud.classList.remove("mensaje-solicitud-exito");
        mensajeSolicitud.classList.add("mensaje-solicitud-error");
      }
      return;
    }

    if (mensajeSolicitud) {
      mensajeSolicitud.textContent = "Enviando solicitud...";
      mensajeSolicitud.classList.remove("mensaje-solicitud-exito");
      mensajeSolicitud.classList.remove("mensaje-solicitud-error");
    }
    if (btnEnviarSolicitud) btnEnviarSolicitud.disabled = true;
    if (btnCancelarSolicitud) btnCancelarSolicitud.disabled = true;
    if (accionesSolicitudExito) accionesSolicitudExito.style.display = "none";

    try {
      const ahoraIso = new Date().toISOString();

      const { error: errorEliminarAnteriores } = await supabase
        .from("solicitudes_acceso")
        .delete()
        .eq("usuario", usuario)
        .eq("estado", "pendiente");

      if (errorEliminarAnteriores) {
        console.error("Error eliminando solicitudes pendientes anteriores:", errorEliminarAnteriores);
        if (mensajeSolicitud) {
          mensajeSolicitud.textContent = "No se pudo preparar la nueva solicitud";
          mensajeSolicitud.classList.remove("mensaje-solicitud-exito");
          mensajeSolicitud.classList.add("mensaje-solicitud-error");
        }
        return;
      }

      const payload = {
        usuario,
        clave,
        nombre_completo: nombreCompleto,
        estado: "pendiente",
        updated_at: ahoraIso
      };

      const { error } = await supabase
        .from("solicitudes_acceso")
        .insert([payload]);

      if (error) {
        console.error("Error enviando solicitud:", error);
        if (mensajeSolicitud) {
          mensajeSolicitud.textContent = "No se pudo enviar la solicitud";
          mensajeSolicitud.classList.remove("mensaje-solicitud-exito");
          mensajeSolicitud.classList.add("mensaje-solicitud-error");
        }
        return;
      }

      if (mensajeSolicitud) {
        mensajeSolicitud.textContent = "Su solicitud sera revisada dentro de las 24 horas a partir de este envio. Luego pruebe ingresar nuevamente.";
        mensajeSolicitud.classList.remove("mensaje-solicitud-error");
        mensajeSolicitud.classList.add("mensaje-solicitud-exito");
      }

      if (usuarioSolicitud) usuarioSolicitud.value = "";
      if (claveSolicitud) claveSolicitud.value = "";
      if (nombreCompletoSolicitud) nombreCompletoSolicitud.value = "";

      if (btnEnviarSolicitud) {
        btnEnviarSolicitud.disabled = true;
        btnEnviarSolicitud.style.display = "none";
      }

      if (btnCancelarSolicitud) {
        btnCancelarSolicitud.disabled = false;
        btnCancelarSolicitud.style.display = "none";
      }

      if (accionesSolicitudExito) {
        accionesSolicitudExito.style.display = "block";
      }

      if (esAdminActual) {
        await cargarSolicitudesAdmin();
      }
    } catch (err) {
      console.error("Error general enviando solicitud:", err);
      if (mensajeSolicitud) {
        mensajeSolicitud.textContent = "Ocurrio un error al enviar la solicitud";
        mensajeSolicitud.classList.remove("mensaje-solicitud-exito");
        mensajeSolicitud.classList.add("mensaje-solicitud-error");
      }
      if (btnEnviarSolicitud) btnEnviarSolicitud.disabled = false;
      if (btnCancelarSolicitud) btnCancelarSolicitud.disabled = false;
    } finally {
      if (btnEnviarSolicitud && btnEnviarSolicitud.style.display !== "none") {
        btnEnviarSolicitud.disabled = false;
      }
      if (btnCancelarSolicitud && btnCancelarSolicitud.style.display !== "none") {
        btnCancelarSolicitud.disabled = false;
      }
    }
  }

  async function aprobarSolicitudAdmin(solicitudId, nombreUsuario) {
    if (!esAdminActual) {
      mostrarMensaje("Solo el admin puede aprobar solicitudes");
      return;
    }

    if (!solicitudId) {
      mostrarMensaje("Solicitud invalida");
      return;
    }

    const confirmado = window.confirm(`Seguro que deseas aprobar la solicitud de ${nombreUsuario || "este usuario"}?`);
    if (!confirmado) return;

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token || "";

      if (!accessToken) {
        mostrarMensaje("No se pudo validar la sesion del admin");
        return;
      }

      const respuesta = await fetch(`${SUPABASE_URL}/functions/v1/aprobar-solicitud-acceso`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ solicitud_id: solicitudId })
      });

      let resultado = null;
      try {
        resultado = await respuesta.json();
      } catch (e) {
        resultado = null;
      }

      if (!respuesta.ok) {
        const mensaje = resultado?.error || resultado?.message || "No se pudo aprobar la solicitud";
        console.error("Error aprobando solicitud:", resultado || respuesta.statusText);
        mostrarMensaje(mensaje);
        return;
      }

      mostrarMensaje("Solicitud aprobada");
      await cargarSolicitudesAdmin();
      await cargarUsuariosAdmin();
    } catch (err) {
      console.error("Error general aprobando solicitud:", err);
      mostrarMensaje("Ocurrio un error al aprobar la solicitud");
    }
  }

  async function rechazarSolicitudAdmin(solicitudId, nombreUsuario) {
    if (!esAdminActual) {
      mostrarMensaje("Solo el admin puede rechazar solicitudes");
      return;
    }

    if (!solicitudId) {
      mostrarMensaje("Solicitud invalida");
      return;
    }

    const confirmado = window.confirm(`Seguro que deseas rechazar la solicitud de ${nombreUsuario || "este usuario"}?`);
    if (!confirmado) return;

    try {
      const { error } = await supabase
        .from("solicitudes_acceso")
        .update({ estado: "rechazado", updated_at: new Date().toISOString() })
        .eq("id", solicitudId);

      if (error) {
        console.error("Error rechazando solicitud:", error);
        mostrarMensaje("No se pudo rechazar la solicitud");
        return;
      }

      mostrarMensaje("Solicitud rechazada");
      await cargarSolicitudesAdmin();
    } catch (err) {
      console.error("Error general rechazando solicitud:", err);
      mostrarMensaje("Ocurrio un error al rechazar la solicitud");
    }
  }

  function cerrarMenusUsuariosAdmin() {
    document.querySelectorAll(".menu-usuario").forEach((menu) => menu.remove());
  }

  function abrirMenuUsuarioAdmin(boton, userId, nombreUsuario) {
    if (!boton || !userId) return;

    const tarjeta = boton.closest(".tarjeta-usuario-admin");
    if (!tarjeta) return;

    const menuExistente = tarjeta.querySelector(".menu-usuario");
    cerrarMenusUsuariosAdmin();

    if (menuExistente) return;

    const menu = document.createElement("div");
    menu.className = "menu-usuario";
    menu.innerHTML = `
      <button
        type="button"
        class="btn-eliminar-usuario"
        data-id="${escaparHtml(userId)}"
        data-usuario="${escaparHtml(nombreUsuario || "") }"
      >Eliminar actividad</button>
    `;

    tarjeta.appendChild(menu);
  }

  async function eliminarUsuarioAdmin(userId, nombreUsuario) {
    if (!esAdminActual) {
      mostrarMensaje("Solo el admin puede eliminar usuarios");
      return;
    }

    if (!userId) {
      mostrarMensaje("Usuario invalido");
      return;
    }

    if (perfilActual && perfilActual.id === userId) {
      mostrarMensaje("No puedes eliminar tu propio usuario admin");
      return;
    }

    const confirmado = window.confirm(`Seguro que deseas eliminar al usuario ${nombreUsuario || "seleccionado"}?`);
    if (!confirmado) return;

    try {
      await supabase
        .from("instalaciones_usuario")
        .update({ activo: false, desenlazado_at: new Date().toISOString(), updated_at: new Date().toISOString() })
        .eq("user_id", userId)
        .eq("activo", true);

      const { data, error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId)
        .select("id, usuario")
        .maybeSingle();

      if (error) {
        console.error("Error eliminando usuario:", error);
        mostrarMensaje("No se pudo eliminar el usuario. Revisa policies de Supabase.");
        return;
      }

      if (!data) {
        mostrarMensaje("No se elimino el usuario. Revisa policies de Supabase.");
        return;
      }

      cerrarMenusUsuariosAdmin();
      mostrarMensaje("Usuario eliminado correctamente");
      await cargarUsuariosAdmin();
      await cargarHistorialAdmin();
      await cargarActividadAdmin();
    } catch (err) {
      console.error("Error general eliminando usuario:", err);
      mostrarMensaje("Ocurrio un error al eliminar el usuario");
    }
  }

  async function desvincularDispositivoAdmin(userId, nombreUsuario) {
    if (!esAdminActual) {
      mostrarMensaje("Solo el admin puede desvincular dispositivos");
      return;
    }

    if (!userId) {
      mostrarMensaje("Usuario invalido");
      return;
    }

    const confirmado = window.confirm(`Seguro que deseas desvincular el dispositivo de ${nombreUsuario || "este usuario"}?`);

    if (!confirmado) return;

    try {
      const adminUser = await obtenerUsuarioActual();
      const payload = {
        activo: false,
        desenlazado_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (adminUser && adminUser.id) {
        payload.desenlazado_por = adminUser.id;
      }

      const { data, error } = await supabase
        .from("instalaciones_usuario")
        .update(payload)
        .eq("user_id", userId)
        .eq("activo", true)
        .select("id, user_id, activo");

      if (error) {
        console.error("Error desenlazando dispositivo:", error);
        mostrarMensaje("No se pudo desvincular el dispositivo");
        return;
      }

      if (!data || data.length === 0) {
        mostrarMensaje("Ese usuario no tiene dispositivo activo vinculado");
        return;
      }

      mostrarMensaje("Dispositivo desenlazado");
      await cargarUsuariosAdmin();
    } catch (err) {
      console.error("Error general desenlazando dispositivo:", err);
      mostrarMensaje("Ocurrio un error al desvincular el dispositivo");
    }
  }

  async function actualizarEstadoUsuarioAdmin(userId, nuevoEstado, nombreUsuario) {
    if (!esAdminActual) {
      mostrarMensaje("Solo el admin puede gestionar usuarios");
      return;
    }

    if (!userId) {
      mostrarMensaje("Usuario invalido");
      return;
    }

    const accionTexto = nuevoEstado ? "activar" : "desactivar";
    const confirmado = window.confirm(`Seguro que deseas ${accionTexto} al usuario ${nombreUsuario || ""}?`);

    if (!confirmado) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({ activo: nuevoEstado })
        .eq("id", userId)
        .select("id, usuario, activo")
        .maybeSingle();

      if (error) {
        console.error("Error actualizando estado del usuario:", error);
        mostrarMensaje("No se pudo actualizar el usuario");
        return;
      }

      if (!data) {
        console.warn("No se actualizo ninguna fila. Revisa RLS/policies.");
        mostrarMensaje("No se actualizo el usuario. Revisa policies de Supabase.");
        return;
      }

      if (perfilActual && perfilActual.id === userId && nuevoEstado === false) {
        mostrarMensaje("Te desactivaste a ti mismo");
      } else {
        mostrarMensaje(`Usuario ${nuevoEstado ? "activado" : "desactivado"}`);
      }

      await cargarUsuariosAdmin();
      await cargarHistorialAdmin();
    } catch (err) {
      console.error("Error general actualizando usuario:", err);
      mostrarMensaje("Ocurrio un error al actualizar el usuario");
    }
  }

  async function eliminarRegistroAdmin(registroId, storagePath) {
    if (!esAdminActual) {
      mostrarMensaje("Solo el admin puede eliminar");
      return;
    }

    if (!registroId) {
      mostrarMensaje("Registro invalido");
      return;
    }

    const confirmado = window.confirm("Seguro que deseas eliminar esta imagen y su registro?");
    if (!confirmado) return;

    try {
      if (storagePath) {
        const { error: errorStorage } = await supabase.storage
          .from("imagenes-generadas")
          .remove([storagePath]);

        if (errorStorage) {
          console.error("Error eliminando imagen de Storage:", errorStorage);
          mostrarMensaje("Fallo al eliminar la imagen del storage");
          return;
        }
      }

      const { error: errorDelete } = await supabase
        .from("registros_generacion")
        .delete()
        .eq("id", registroId);

      if (errorDelete) {
        console.error("Error eliminando registro:", errorDelete);
        mostrarMensaje("Fallo al eliminar el registro");
        return;
      }

      mostrarMensaje("Registro eliminado");
      await cargarHistorialAdmin();
      await cargarUsuariosAdmin();
    } catch (err) {
      console.error("Error general eliminando registro:", err);
      mostrarMensaje("Ocurrio un error al eliminar");
    }
  }

  if (btnRecargarHistorial) {
    btnRecargarHistorial.addEventListener("click", async () => {
      if (!esAdminActual) {
        mostrarMensaje("Solo el admin puede ver el historial");
        return;
      }

      paginaActualAdmin = 1;
      await cargarHistorialAdmin();
    });
  }

  if (btnRecargarUsuariosAdmin) {
    btnRecargarUsuariosAdmin.addEventListener("click", async () => {
      if (!esAdminActual) {
        mostrarMensaje("Solo el admin puede ver usuarios");
        return;
      }

      await cargarUsuariosAdmin();
    });
  }

  if (btnRecargarSolicitudesAdmin) {
    btnRecargarSolicitudesAdmin.addEventListener("click", async () => {
      if (!esAdminActual) {
        mostrarMensaje("Solo el admin puede ver solicitudes");
        return;
      }

      await cargarSolicitudesAdmin();
    });
  }

  if (btnPaginaAnterior) {
    btnPaginaAnterior.addEventListener("click", () => {
      if (paginaActualAdmin <= 1) return;
      paginaActualAdmin--;
      renderizarPaginaActualAdmin();
    });
  }

  if (btnPaginaSiguiente) {
    btnPaginaSiguiente.addEventListener("click", () => {
      const totalPaginas = Math.max(1, Math.ceil(registrosAdminCache.length / REGISTROS_POR_PAGINA));
      if (paginaActualAdmin >= totalPaginas) return;
      paginaActualAdmin++;
      renderizarPaginaActualAdmin();
    });
  }

  if (filtroUsuarioAdmin) {
    filtroUsuarioAdmin.addEventListener("input", () => {
      aplicarFiltrosAdmin();
    });
  }

  if (filtroFechaDesdeAdmin) {
    filtroFechaDesdeAdmin.addEventListener("change", () => {
      aplicarFiltrosAdmin();
    });
  }

  if (filtroFechaHastaAdmin) {
    filtroFechaHastaAdmin.addEventListener("change", () => {
      aplicarFiltrosAdmin();
    });
  }

  if (filtroFechaAdmin) {
    filtroFechaAdmin.addEventListener("change", () => {
      aplicarFiltrosAdmin();
    });
  }

  if (btnLimpiarFiltrosAdmin) {
    btnLimpiarFiltrosAdmin.addEventListener("click", () => {
      limpiarFiltrosAdminUI();
      aplicarFiltrosAdmin();
    });
  }

  if (filtroUsuarioPanelAdmin) {
    filtroUsuarioPanelAdmin.addEventListener("input", () => {
      aplicarFiltroUsuariosAdmin();
    });
  }

  if (btnLimpiarUsuariosAdmin) {
    btnLimpiarUsuariosAdmin.addEventListener("click", () => {
      limpiarBusquedaUsuariosAdminUI();
      aplicarFiltroUsuariosAdmin();
    });
  }

  if (historialAdmin) {
    historialAdmin.addEventListener("click", async (e) => {
      const botonDescargarRegistro = e.target.closest(".btn-descargar-registro");
      if (botonDescargarRegistro) {
        const url = botonDescargarRegistro.getAttribute("data-url") || "";
        const nombre = botonDescargarRegistro.getAttribute("data-nombre") || "imagen.jpg";
        await descargarImagenDesdeUrl(url, nombre);
        return;
      }

      const botonEliminar = e.target.closest(".btn-eliminar-registro");
      if (!botonEliminar) return;

      const registroId = botonEliminar.getAttribute("data-id");
      const storagePath = botonEliminar.getAttribute("data-storage-path") || "";

      await eliminarRegistroAdmin(registroId, storagePath);
    });
  }

  if (listaUsuariosAdmin) {
    listaUsuariosAdmin.addEventListener("click", async (e) => {
      const botonMenuUsuario = e.target.closest(".btn-menu-usuario");
      if (botonMenuUsuario) {
        e.preventDefault();
        e.stopPropagation();
        const userId = botonMenuUsuario.getAttribute("data-id") || "";
        const nombreUsuario = botonMenuUsuario.getAttribute("data-usuario") || "";
        abrirMenuUsuarioAdmin(botonMenuUsuario, userId, nombreUsuario);
        return;
      }

      const botonEliminarUsuario = e.target.closest(".btn-eliminar-usuario");
      if (botonEliminarUsuario) {
        e.preventDefault();
        e.stopPropagation();
        const userId = botonEliminarUsuario.getAttribute("data-id") || "";
        const nombreUsuario = botonEliminarUsuario.getAttribute("data-usuario") || "";
        await eliminarUsuarioAdmin(userId, nombreUsuario);
        return;
      }

      const botonDesvincular = e.target.closest(".btn-desvincular-dispositivo-admin");
      if (botonDesvincular) {
        const userId = botonDesvincular.getAttribute("data-id") || "";
        const nombreUsuario = botonDesvincular.getAttribute("data-usuario") || "";
        await desvincularDispositivoAdmin(userId, nombreUsuario);
        return;
      }

      const botonToggle = e.target.closest(".btn-toggle-usuario-admin");
      if (!botonToggle) return;

      const userId = botonToggle.getAttribute("data-id") || "";
      const activoActual = botonToggle.getAttribute("data-activo") === "true";
      const nombreUsuario = botonToggle.getAttribute("data-usuario") || "";

      await actualizarEstadoUsuarioAdmin(userId, !activoActual, nombreUsuario);
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".tarjeta-usuario-admin")) {
        cerrarMenusUsuariosAdmin();
      }
    });
  }

  if (listaSolicitudesAdmin) {
    listaSolicitudesAdmin.addEventListener("click", async (e) => {
      const botonAprobar = e.target.closest(".btn-aprobar-solicitud-admin");
      if (botonAprobar) {
        const solicitudId = botonAprobar.getAttribute("data-id") || "";
        const nombreUsuario = botonAprobar.getAttribute("data-usuario") || "";
        await aprobarSolicitudAdmin(solicitudId, nombreUsuario);
        return;
      }

      const botonRechazar = e.target.closest(".btn-rechazar-solicitud-admin");
      if (!botonRechazar) return;

      const solicitudId = botonRechazar.getAttribute("data-id") || "";
      const nombreUsuario = botonRechazar.getAttribute("data-usuario") || "";
      await rechazarSolicitudAdmin(solicitudId, nombreUsuario);
    });
  }

  if (botonGenerar) {
    botonGenerar.addEventListener("click", function () {
      const archivo = inputFoto && inputFoto.files ? inputFoto.files[0] : null;

      if (!archivo) {
        mostrarMensaje("Selecciona una foto primero");
        return;
      }

      const lector = new FileReader();

      lector.onload = function (evento) {
        const imagen = new Image();

        imagen.onload = function () {
          canvas.width = 1080;
          canvas.height = 720;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.save();
          ctx.scale(-1, 1);
          ctx.drawImage(
            imagen,
            -canvas.width,
            0,
            canvas.width,
            canvas.height
          );
          ctx.restore();

          ctx.save();
          ctx.globalAlpha = 0.06;
          ctx.filter = "blur(0.35px)";
          ctx.drawImage(canvas, 0, 0);
          ctx.restore();
          ctx.filter = "none";
          ctx.globalAlpha = 1;

          const coordenadas = inputCoordenadas ? inputCoordenadas.value.trim() : "";
          const fecha = inputFecha ? formatearFecha(inputFecha.value.trim()) : "";
          const hora = inputHora ? inputHora.value.trim() : "";
          const ubicacion = inputUbicacion ? inputUbicacion.value.trim().toUpperCase() : "";

          ctx.font = `${TEXT_SIZE}px sans-serif`;

          const ESCALA_X_LINEA_1 = 1;
          const ESCALA_X_LINEA_2 = 1;
          const ESCALA_X_LINEA_3 = 0.98217;

          const linea1 = "   CREADO POR:  SUTRAN";
          const linea2 = "   COORDENADAS: " + coordenadas;
          const linea3Completa = "   " + ubicacion + " - FECHA: " + fecha + " " + hora;

          const maxAnchoTexto = canvas.width - 10;
          const linea3 = limitarTextoSinPuntos(linea3Completa, maxAnchoTexto, ESCALA_X_LINEA_3);

          const x = 0;
          const y1 = canvas.height - 40;
          const y2 = canvas.height - 25;
          const y3 = canvas.height - 10;

          dibujarLineaAPK(linea1, x, y1, ESCALA_X_LINEA_1);
          dibujarLineaAPK(linea2, x, y2, ESCALA_X_LINEA_2);
          dibujarLineaAPK(linea3, x, y3, ESCALA_X_LINEA_3);

          dataUrlGeneradaActual = canvas.toDataURL("image/jpeg", 0.95);
          imagenListaParaGuardar = true;
          guardandoEnSupabase = false;
          ultimoStoragePathGuardado = null;
          ultimaPublicUrlGuardada = null;

          if (botonDescargar) {
            botonDescargar.disabled = false;
            botonDescargar.style.background = "#4b79bb";
          }
        };

        imagen.src = evento.target.result;
      };

      lector.readAsDataURL(archivo);
    });
  }

  if (botonDescargar) {
    botonDescargar.addEventListener("click", async function () {
      if (botonDescargar.disabled) {
        mostrarMensaje("Primero genera la imagen");
        return;
      }

      const dataURLFinal = dataUrlGeneradaActual || canvas.toDataURL("image/jpeg", 0.95);

      const link = document.createElement("a");
      link.download = "registro_fotografico.jpg";
      link.href = dataURLFinal;
      link.click();

      if (!imagenListaParaGuardar) return;
      if (guardandoEnSupabase) return;

      guardandoEnSupabase = true;

      const guardadoOk = await subirImagenDescargadaYGuardarRegistro(dataURLFinal);

      if (guardadoOk) {
        imagenListaParaGuardar = false;
        mostrarMensaje("Imagen descargada y guardada");
      }

      guardandoEnSupabase = false;
    });
  }

  limpiarCanvas();

  function forzarPantallaCorrecta() {
    const loginVisible = pantallaLogin && pantallaLogin.style.display !== "none";
    const appVisible = appReal && appReal.style.display !== "none";
    if (appVisible && pantallaLogin) {
      pantallaLogin.style.display = "none";
      pantallaLogin.setAttribute("aria-hidden", "true");
    }
    if (loginVisible && appReal) {
      appReal.style.display = "none";
      appReal.setAttribute("aria-hidden", "true");
    }
  }

  setInterval(forzarPantallaCorrecta, 500);
  revisarSesion();

  setTimeout(() => {
    mostrarBody();
  }, 1500);

  // =========================
  // MENU 3 PUNTOS ACTIVIDAD + ELIMINAR
  // =========================
  function cerrarMenusActividad() {
    document.querySelectorAll(".menu-actividad").forEach((menu) => menu.remove());
  }

  async function eliminarActividadUsuario(userId, usuarioNombre) {
    const nombre = usuarioNombre || "este usuario";
    const confirmar = window.confirm(`¿Seguro que deseas eliminar la actividad de ${nombre}?`);
    if (!confirmar) return;

    try {
      if (userId) {
        const [{ error: errorHistorial }, { error: errorResumen }] = await Promise.all([
          supabase.from("actividad_sistema_historial").delete().eq("user_id", userId),
          supabase.from("actividad_sistema").delete().eq("user_id", userId)
        ]);

        if (errorHistorial || errorResumen) {
          console.error("Error eliminando actividad:", errorHistorial || errorResumen);
          mostrarMensaje("No se pudo eliminar la actividad");
          return;
        }
      } else {
        const { error } = await supabase
          .from("actividad_sistema_historial")
          .delete()
          .eq("usuario", usuarioNombre || "");

        if (error) {
          console.error("Error eliminando actividad sin user_id:", error);
          mostrarMensaje("No se pudo eliminar la actividad");
          return;
        }
      }

      cerrarMenusActividad();
      detalleActividadExpandidoUserId = null;
      mostrarMensaje("Actividad eliminada correctamente");
      await cargarActividadAdmin();
    } catch (error) {
      console.error("Error general eliminando actividad:", error);
      mostrarMensaje("Ocurrió un error al eliminar la actividad");
    }
  }

  function crearMenuActividad(boton) {
    cerrarMenusActividad();

    const tarjeta = boton.closest(".tarjeta-actividad-admin");
    if (!tarjeta) return;

    const userId = boton.dataset.userId || tarjeta.dataset.userId || "";
    const usuarioNombre = boton.dataset.usuario || tarjeta.dataset.usuario || "";

    const menu = document.createElement("div");
    menu.className = "menu-actividad";
    menu.innerHTML = `
      <button type="button" class="btn-eliminar-actividad">
        Eliminar actividad
      </button>
    `;

    tarjeta.appendChild(menu);

    const btnEliminar = menu.querySelector(".btn-eliminar-actividad");
    if (btnEliminar) {
      btnEliminar.addEventListener("click", async (event) => {
        event.stopPropagation();
        await eliminarActividadUsuario(userId, usuarioNombre);
      });
    }
  }

  document.addEventListener("click", (event) => {
    const botonMenuActividad = event.target.closest(".btn-menu-actividad");
    if (botonMenuActividad) {
      event.preventDefault();
      event.stopPropagation();
      crearMenuActividad(botonMenuActividad);
      return;
    }

    if (!event.target.closest(".menu-actividad")) {
      cerrarMenusActividad();
    }
  });

  if (listaActividadAdmin) {
    listaActividadAdmin.addEventListener("click", async (event) => {
      const botonVer = event.target.closest(".btn-ver-actividad");
      if (!botonVer) return;

      event.preventDefault();
      event.stopPropagation();

      const clave = botonVer.dataset.clave || botonVer.closest(".tarjeta-actividad-admin")?.dataset.actividadClave;
      if (!clave) return;

      await toggleDetalleActividadAdmin(clave);
    });
  }

});