import { CListGroup, CListGroupItem } from "@coreui/react";
import React from "react";

function Notification() {

    return (
        <CListGroup>
            <CListGroupItem component="a" href="#" active>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">List group item heading</h5>
                    <small>3 days ago</small>
                </div>
                <p className="mb-1">
                    Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                    Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                    Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                </p>
                <small>Donec id elit non mi porta.</small>
            </CListGroupItem>
        
        </CListGroup>
    )
}

export { Notification };