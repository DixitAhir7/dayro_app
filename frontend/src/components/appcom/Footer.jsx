import { Link } from "react-router-dom";

function Footer() {

    return (
        <main>
            <footer>
                <div className="flex flex-wrap p-4 w-full">
                    <div className="flex-1/6">
                        <Link to='contact'>contact</Link>
                        <Link to='readinfo'>readinfo</Link>
                        <Link to='readinfo'>readinfo</Link>
                        <Link to='readinfo'>readinfo</Link>
                    </div>
                    <div className="flex-1/6">
                        <Link to='contact'>contact</Link>
                        <Link to='contact'>contact</Link>
                        <Link to='readinfo'>readinfo</Link>
                    </div>
                    <div className="flex-1/6">
                        <Link to='contact'>contact</Link>
                        <Link to='readinfo'>readinfo</Link>
                    </div>
                    <div className="flex-1/6">
                        <Link to='contact'>contact</Link>
                        <Link to='readinfo'>readinfo</Link>
                        <Link to='readinfo'>readinfo</Link>
                        <Link to='readinfo'>readinfo</Link>
                    </div>
                </div>
            </footer>
        </main>
    )
};

export default Footer;