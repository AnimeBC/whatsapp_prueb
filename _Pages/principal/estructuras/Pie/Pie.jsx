import estilos from "./pie.module.css";

export default function Pie() {
  return (
    <footer className={estilos.pie}>
      <div className={`contenedor ${estilos.contenido}`}>
        <span className={estilos.marca}>Drive Mid</span>
        <span className={estilos.meta}>Movility Fleet 2026</span>
      </div>
    </footer>
  );
}
