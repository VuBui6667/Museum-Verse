import { useEffect, useState } from "react"
import museums, { GetMuseumResponse } from "../../../api/museums"
import CollectionCard from "../../common/CollectionCard"

const CollectionPageScreen = () => {
    const [listMuseum, setListMuseum] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        const handleFetchAllMuseum = async () => {
            try {
                setIsLoading(true)
                const response = await museums.getAll()
                setListMuseum(Object.values(response))
                setIsLoading(false)
            } catch (error) {
                console.log(error);
                setIsLoading(false)
            }
        }
        handleFetchAllMuseum()
    }, [])

    return (
        <div className="mt-12 md:mt-0 md:py-24 md:px-12 lg:px-16 xl:px-28">
            <div className="mt-12 px-12 md:px-0">
                <label className="relative flex mb-4 px-2">
                    <div>
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                            <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            </svg>
                        </span>
                        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search" />
                    </div>

                    <div>

                    </div>

                </label>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
                    {listMuseum.map(museum => (
                        <CollectionCard publicKey={museum.publicKey} museum={museum} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CollectionPageScreen