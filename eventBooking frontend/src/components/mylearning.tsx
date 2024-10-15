
import { Layout } from "./common/Layout"
import {Listbox, ListboxItem} from "@nextui-org/react";


export const Mylearning:React.FC=()=>{
      return(
      <div>
        <Layout>
       
      <Listbox
        aria-label="Actions"
        onAction={(key) => alert(key)}
      >
        <ListboxItem key="new">New file</ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" className="text-danger" color="danger">
          Delete file
        </ListboxItem>
      </Listbox>

        </Layout>
        </div>
      )

}