import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between max-w-260 w-full mt-16 px-4">
      <Link href="/" className="flex items-center gap-2">
        <Image
          alt="Foto de perfil"
          src="/images/foto_perfil.jpg"
          width={60}
          height={60}
          className="rounded-full"
        />

        <h2>Santiago Greco Domínguez</h2>
      </Link>

      <nav className="flex gap-4">
        <Link href="/projects">Proyectos</Link>
        <Link href="/tecnologies">Tecnologías</Link>
        <Link href="/profile">Profile</Link>
      </nav>
    </header>
  );
}
