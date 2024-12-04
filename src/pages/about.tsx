import "../style/about.css"

function About() {
  return (
    <div className="main_about">
      <section className="about">
       <span> Esta es la primera versión de “AITrainer” un proyecto creado por mi Emilio Servetti en el que utilicé varias herramientas, entre ellas:</span>
        <ul>
          <li>Node.js con Express.</li>
          <li>Typescript.</li>
          <li>API de Open AI.</li>
          <li>React</li>
        </ul>
      </section>
      <section className="contact">
        Si quisieras contactarme, puedes hacerlo a través de los siguientes medios:
        <ul>
          <li>
            <a href="https://emilio-servetti.vercel.app/">Mi portafolio.</a>
          </li>
          <li>
            <a href="https://github.com/EServetti">Git Hub.</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/emilio-servetti-3981592ba/">
              Mi Linkedin.
            </a>
          </li>
          <li>O enviame un email a servettiemilio1@gmail.com</li>
        </ul>
      </section>
    </div>
  );
}

export default About;
