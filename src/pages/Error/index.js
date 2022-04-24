import React from "react";
import {Button, Result} from "antd";
import {Link} from "react-router-dom";

export default function Error() {
    return (
        <div className="main">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
            />
        </div>
    )
}