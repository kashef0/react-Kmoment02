import './Footer.css'

// egenskap för fot komponenet
interface Props {
  Utvecklare: string
}

const Footer = ( {Utvecklare}: Props ) => {
  // hämta nuvarande året
  const year = new Date().getFullYear(); 
  return (
    <footer>
      <div className="footer">
        <p>Copyright (c) {year} {Utvecklare}</p>
      </div>
    </footer>
  )
}

export default Footer