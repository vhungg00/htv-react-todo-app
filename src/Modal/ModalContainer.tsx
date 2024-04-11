import React, { useEffect } from "react";
import {NOP} from "@/utils/function"
import { Backdrop } from "@/components/Backdrop";
import { clearAllBodyScrollLocks } from "@/utils/bodyScrollLock";

type ModalContainerProps = {
    onClickBackdrop?: () => void;
    children: React.ReactNode;
}

export const ModalContainer: React.FC<ModalContainerProps> = ({onClickBackdrop, children}) => {
  useEffect(() => () => clearAllBodyScrollLocks() ,[])
    return (
       <div id="modalContainer">
         <Backdrop id="backdrop" onClick={onClickBackdrop} />
         {children}
       </div>
    )
}