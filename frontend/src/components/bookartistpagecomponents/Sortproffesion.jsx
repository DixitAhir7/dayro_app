import { useArtist } from 'Customhooks/useArtist/Getartistscontext';
import Select from 'react-select';


//component for sort artists based on proffesion
export default function Sortproffesion() {

    const useArtisthook = useArtist();

    const proffesion = [
        { value: "folksingers" },
        { value: "singers" },
        { value: "santvani" },
        { value: "comedy" }
    ]

    // show only options that we have by artists from backend
    const onlyUnique = useArtisthook.SortedArtists.filter((item, index, self) => {
        return index === self.findIndex(el => el.id === item.id)
    }
    );

    return (
        <>
            <form name="sortartistsform">
                <select
                    className="selectStyle max-sm:p-0"
                    onChange={useArtisthook.sortonProffesion}>
                    <option value="kalakaro" disabled>kalakaro</option>
                    {
                        proffesion.map((o, i) => (
                            <option key={i} value={o.value}>{o.value}</option>
                        ))
                    }
                </select>
            </form>
        </>
    )
};