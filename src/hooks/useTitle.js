import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} - Chocolate Management System`
    }, [title])
}

export default useTitle;