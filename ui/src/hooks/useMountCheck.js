import React, { useEffect, useMemo, useRef} from 'react'

// This is just an example hook to demonstrate hook pattern. 
export const useMountedCheck = () => {
    const isMounted = useRef(true)

    const returnObj = useMemo(() => ({
        get isStillMounted() {
            return () => isMounted.current 
        }
     }), [])

     useEffect(() => {
        // when component is mounted (rendered) current is set to true
        isMounted.current = true
        // when component is unmounted, use effect return callback is trigger when isMounted is set to false
        return () => { isMounted.current = false}
     })

     return returnObj
}