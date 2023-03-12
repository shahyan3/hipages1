
import React from "react"
export function AuthenticatedRoute({ children }) {

    // Check user has access to the page. Get the perms data from e.g. user object, local storage etc.
    // Change access to false to see change.
    const hasAccess = (access = true) => access ? true : false
    
    return hasAccess() ?  <>{children}</> : <h3>Sorry. You don't have access to this page</h3>

}