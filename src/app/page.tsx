import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-[500px] max-w-[85%] mx-auto flex flex-wrap gap-[5dvh] justify-center mt-[15dvh] mb-[5dvh]">
      <Link
        className="bg-slate-200 rounded-md p-[10px] shadow-md text-sm lg:text-base"
        href={"/43819"}
      >
        Flatåsen senter
      </Link>
      <Link
        className="bg-slate-200 rounded-md p-[10px] shadow-md text-sm lg:text-base"
        href={"/41587"}
      >
        Tiller vgs.
      </Link>
      <Link
        className="bg-slate-200 rounded-md p-[10px] shadow-md text-sm lg:text-base"
        href={"/61276"}
      >
        Tonstadkrysset
      </Link>
      <Link
        className="bg-slate-200 rounded-md p-[10px] shadow-md text-sm lg:text-base"
        href={"/44029"}
      >
        Tillerterminalen
      </Link>
      <Link
        className="bg-slate-200 rounded-md p-[10px] shadow-md text-sm lg:text-base"
        href={"/41613"}
      >
        Prinsens gate
      </Link>
    </div>
  );
}
