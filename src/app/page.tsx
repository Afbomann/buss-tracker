import Link from "next/link";
import { redirect } from "next/navigation";

export default function HomePage() {
  return (
    <>
      <h2 className="text-center text-xl lg:text-2xl font-bold mt-[5dvh]">
        Buss Tracker😎
      </h2>
      <div className="w-[500px] max-w-[85%] mx-auto flex flex-wrap gap-[5dvh] justify-center mt-[5dvh]">
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

      <h4 className="text-center text-base lg:text-lg mt-[5dvh]">
        Finner du ikke busstoppet ditt?
      </h4>

      <form
        className="w-fit mx-auto mt-[2dvh] flex gap-[15px]"
        action={async (formData: FormData) => {
          "use server";

          return redirect(`/${formData.get("id")}`);
        }}
      >
        <input
          className="text-sm lg:text-base bg-slate-200 rounded-md px-[7px] py-[5px] shadow-md outline-none"
          name="id"
          placeholder="Busstopp ID"
          type="text"
        />
        <input
          className="cursor-pointer bg-slate-200 shadow-md rounded-md px-[20px] py-[5px] text-sm lg:text-base"
          type="submit"
          value="Søk"
        />
      </form>

      <div className="w-fit mx-auto my-[3dvh] flex flex-col items-center gap-[1dvh]">
        <Link
          className="text-blue-400 underline text-sm lg:text-base"
          target="_blank"
          href={"https://stoppested.entur.org"}
        >{`Her finner du busstopp id'er`}</Link>

        <h4 className="text-sm lg:text-base">
          Eksempel: NSR:StopPlace:<span className="font-bold">43819</span>
        </h4>
      </div>
    </>
  );
}
