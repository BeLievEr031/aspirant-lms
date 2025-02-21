// import clsx from 'clsx';
// import { Link, useLocation } from 'react-router-dom'

import { useNavigate } from "react-router-dom";
import useBreadCrumb from "../../store/breadCrumbStore";
import clsx from "clsx";

// import { useNavigate } from "react-router-dom";
// import useBreadCrumb from "../../store/breadCrumbStore"

// function BreadCrumb() {
//     const location = useLocation();
//     // console.log(location.state);
//     let breadCrumbUrl = ""
//     const pathnameArr = location.pathname.split("/").filter((link) => link).map((url) => {
//         return breadCrumbUrl += "/" + url
//     });

//     const { breadCrumb, addBreadCrumb } = useBreadCrumb();
//     const navigate = useNavigate();
//     const handleBreadNavigation = (id: string) => {
//         const index = breadCrumb.findIndex((item) => item.id === id)
//         console.log(index);
//         if (index !== 0) {
//             const slicedBreadCrum = breadCrumb.slice(0, index)
//             addBreadCrumb(slicedBreadCrum)
//         } else {
//             addBreadCrumb([breadCrumb[0]])
//         }
//     }

//     return (
//         <div className='sticky top-0'>{
//             pathnameArr.map((url, index) => {
//                 return <Link key={index} to={url} className={clsx('text-md font-semibold',
//                     index === pathnameArr.length - 1 ? "pointer-events-none cursor-not-allowed text-gray-400" : "text-blue-600"
//                 )}
//                 >
//                     <span className=''>/</span>
//                     <span className='mx-1 '>{url.split("/")[url.split("/").length - 1]}</span>
//                 </Link>
//             })
//         }</div>
//     )
// }

// export default BreadCrumb




function BreadCrumb() {
    const { breadCrumb, addBreadCrumb } = useBreadCrumb();
    const navigate = useNavigate();
    const handleBreadNavigation = (id: string) => {
        const index = breadCrumb.findIndex((item) => item.id === id)
        if (index !== 0) {
            const slicedBreadCrum = breadCrumb.slice(0, index + 1)
            addBreadCrumb(slicedBreadCrum)
            navigate(breadCrumb[index].url);
        } else {
            addBreadCrumb([breadCrumb[0]])
            navigate(breadCrumb[0].url);
        }

    }
    return (
        <div>{
            breadCrumb.map((item, index) => {
                return <button key={index} onClick={() => handleBreadNavigation(item.id)}
                    className={clsx('text-md font-semibold',
                        index === breadCrumb.length - 1 ? "pointer-events-none cursor-not-allowed text-gray-400" : "text-blue-600"
                    )}
                >
                    <span>{item.label}</span>
                </button>
            })}
        </div>
    )
}

export default BreadCrumb


// import { useLocation, useNavigate } from "react-router-dom";
// import useBreadCrumb from "../../store/breadCrumbStore";

// const Breadcrumbs = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     // Extract breadcrumb paths from location.pathname
//     const paths = location.pathname.split("/").filter((path) => path);

//     // Generate breadcrumb links
//     const breadcrumbs = paths.map((path, index) => {
//         const route = `/${paths.slice(0, index + 1).join("/")}`;
//         return { name: path.charAt(0).toUpperCase() + path.slice(1), path: route };
//     });

//     const { breadCrumb, addBreadCrumb } = useBreadCrumb();


//     return (
//         <nav>
//             <ul style={{ display: "flex", listStyle: "none", gap: "10px" }}>
//                 <li>
//                     <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer" }}>
//                         Home
//                     </button>
//                 </li>
//                 {breadcrumbs.map((crumb, index) => (
//                     <li key={crumb.path}>
//                         {" > "}
//                         <button
//                             onClick={() => {

//                                 const index = breadCrumb.findIndex((item) => item.id === id)
//                                 console.log(index);
//                                 if (index !== 0) {
//                                     const slicedBreadCrum = breadCrumb.slice(0, index)
//                                     addBreadCrumb(slicedBreadCrum)
//                                 } else {
//                                     addBreadCrumb([breadCrumb[0]])
//                                 }

//                                 navigate(crumb.path)
//                             }}
//                             style={{ background: "none", border: "none", cursor: "pointer" }}
//                         >
//                             {crumb.name}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </nav>
//     );
// };

// export default Breadcrumbs;
