import { Link } from "react-router-dom"
// import MetaData from "./MetaData"

const PageNotFound = () => {

    return(
        <>
            <MetaData title={"Page Not Found - PrinterNotWorking"} />

            <section className="max-w-5xl m-auto py-14 px-2.5 text-center flex flex-col gap-5">
                <h3 className="text-8xl font-semibold text-primary-yellow pt-1 text-center">404</h3>
                <p className="text-2xl">Oops! That page can't be found.</p>
                <div className="w-20 h-1 bg-black m-auto"></div>
                <p className="max-w-md mx-auto">We're really sorry but we can't seem to find the page you were looking for.</p>

                <Link to="/" className="w-max bg-primary-yellow mx-auto text-white font-bold uppercase text-xs tracking-widest py-3.5 px-8" reloadDocument={true}>Back to home</Link>
            </section>
        </>
    )
}

export default PageNotFound