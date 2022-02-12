import { Dispatch, SetStateAction, FormEvent } from "react";

type FormProps = {
    setUserSearch: Dispatch<SetStateAction<string>>;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    userSearch: string;
};

const Form = ({ setUserSearch, handleSubmit, userSearch }: FormProps) => {
    return (
        <form
            className="px-4 sm:px-[124px] lg:px-[312px]"
            onSubmit={handleSubmit}
        >
            <section className="flex justify-center flex-col gap-4">
                <input
                    type="text"
                    placeholder="Search"
                    className="px-4 py-2 rounded bg-black focus:outline-none focus:shadow-outline w-full"
                    onChange={(e) => setUserSearch(e.target.value)}
                    value={userSearch}
                />
                <button className="rounded text-2xl bg-purple-500 shadow-md shadow-purple-500/50 px-4 py-2">
                    Buscar
                </button>
            </section>
        </form>
    );
};

export default Form;
