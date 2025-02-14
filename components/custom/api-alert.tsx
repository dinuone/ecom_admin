import { Copy, Server } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Badge, BadgeProps } from "../ui/badge"
import { Button } from "../ui/button"
import toast from "react-hot-toast"


interface ApiAlertProps {
    title:string,
    description:string,
    variant:"public" | "admin"
}

const textMap: Record<ApiAlertProps['variant'], string> ={
    public: "Public",
    admin:"Admin"
}


const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> ={
    public: "secondary",
    admin:"danger"
}


export const APiAlert = ({title,description,variant="public"}:ApiAlertProps) =>{

    const onCopy = (description:string) => {
        navigator.clipboard.writeText(description)
        toast.success("Api Route copied to the clipboard")
    }

    return(
       <Alert>
            <Server className="h-4 w-4"/>
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                     {description}
                </code>

                <Button size="icon" variant="outline" onClick={() => onCopy(description)}>
                    <Copy className="h-4 w-4"/>
                </Button>
               
            </AlertDescription>
       </Alert>
    )
}