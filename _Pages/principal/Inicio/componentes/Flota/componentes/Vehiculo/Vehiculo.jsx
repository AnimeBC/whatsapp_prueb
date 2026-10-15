import {
  nf,
  fechaCorta,
  enlaceWhatsApp,
} from "@/_Pages/principal/datos/formato";
import estilos from "./vehiculo.module.css";

function ValorWhatsApp({ numero }) {
  if (!numero) return <span className={estilos.pendiente}>Pendiente</span>;
  return (
    <a
      className={estilos.enlace}
      href={enlaceWhatsApp(numero)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {numero}
    </a>
  );
}

function Servicio({ servicio, total }) {
  if (!servicio) {
    return (
      <div className={estilos.medidorCuerpo}>
        <div className={estilos.medidorTexto}>
          <span>Pendiente</span>
        </div>
        <div className={estilos.barra} />
      </div>
    );
  }

  const avance =
    total != null ? Math.min(100, Math.round((total / servicio) * 100)) : 0;
  const restante = total != null ? Math.max(0, servicio - total) : null;

  return (
    <div className={estilos.medidorCuerpo}>
      <div className={estilos.medidorTexto}>
        <span>
          {restante != null ? `${nf.format(restante)} km restantes` : "Sin lectura"}
        </span>
        <span>{avance}%</span>
      </div>
      <div className={estilos.barra}>
        <i style={{ width: `${avance}%` }} />
      </div>
      <span className={estilos.servicioMeta}>
        servicio a {nf.format(servicio)} km
      </span>
    </div>
  );
}

export default function Vehiculo({
  auto,
  semana,
  referencia,
  valor,
  onCambio,
  onRegistrar,
}) {
  const activo =
    referencia == null || new Date(auto.vigencia).getTime() >= referencia;
  const kmSemanal =
    auto.kmTotal != null && auto.kmAnterior != null
      ? nf.format(auto.kmTotal - auto.kmAnterior)
      : "—";

  return (
    <article className={estilos.ficha}>
      <header className={estilos.cabecera}>
        <div className={estilos.placa}>
          <span className={estilos.placaEstado}>Yucatán</span>
          <span className={estilos.placaTexto}>{auto.placa}</span>
        </div>

        <div className={estilos.identidad}>
          <h3>{auto.modelo}</h3>
          <p>Póliza {auto.poliza}</p>
        </div>

        <div className={estilos.estadoBloque}>
          <span
            className={`${estilos.estado} ${
              activo ? estilos.activo : estilos.vencido
            }`}
          >
            {activo ? "Seguro vigente" : "Seguro vencido"}
          </span>
          <span className={estilos.vigencia}>
            vence {fechaCorta(auto.vigencia)}
          </span>
        </div>
      </header>

      <div className={estilos.lecturas}>
        <div className={estilos.lectura}>
          <span className={estilos.etiqueta}>Odómetro total</span>
          <b className={estilos.cifra}>
            {auto.kmTotal != null ? nf.format(auto.kmTotal) : "—"}
            <em>km</em>
          </b>
        </div>
        <div className={estilos.lectura}>
          <span className={estilos.etiqueta}>Recorrido esta semana</span>
          <b className={estilos.cifra}>
            {kmSemanal}
            <em>km</em>
          </b>
        </div>
        <div className={estilos.medidor}>
          <span className={estilos.etiqueta}>Próximo servicio</span>
          <Servicio servicio={auto.servicio} total={auto.kmTotal} />
        </div>
      </div>

      <dl className={estilos.campos}>
        <div>
          <dt>Conductor</dt>
          <dd>
            {auto.conductor ? (
              <span>{auto.conductor}</span>
            ) : (
              <span className={estilos.pendiente}>Pendiente</span>
            )}
          </dd>
        </div>
        <div>
          <dt>WhatsApp</dt>
          <dd>
            <ValorWhatsApp numero={auto.whatsapp} />
          </dd>
        </div>
        <div>
          <dt>Contacto familiar</dt>
          <dd>
            <ValorWhatsApp numero={auto.familiar} />
          </dd>
        </div>
        <div>
          <dt>GPS</dt>
          <dd>
            <a
              className={estilos.enlace}
              href={auto.gps}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver ubicación
            </a>
          </dd>
        </div>
        <div>
          <dt>Incidencias</dt>
          <dd>{auto.incidencias}</dd>
        </div>
        <div>
          <dt>Pago semana {semana ?? "—"}</dt>
          <dd>
            {auto.pagado === true ? (
              <span className={`${estilos.estado} ${estilos.activo}`}>
                Pagado
              </span>
            ) : (
              <span className={`${estilos.estado} ${estilos.pendienteFila}`}>
                Pendiente
              </span>
            )}
          </dd>
        </div>
      </dl>

      <div className={estilos.registrar}>
        <input
          className={estilos.entrada}
          type="number"
          inputMode="numeric"
          placeholder="Nuevo km total"
          value={valor}
          onChange={(e) => onCambio(e.target.value)}
        />
        <button className={estilos.boton} type="button" onClick={onRegistrar}>
          Registrar km
        </button>
      </div>
    </article>
  );
}
