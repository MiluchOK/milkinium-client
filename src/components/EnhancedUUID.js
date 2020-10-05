import Chip from "@material-ui/core/Chip";
import {truncateUUID} from "../utils";
import CopyIcon from "@material-ui/icons/FileCopy";
import React from "react";

export default function EnhancedUUID({ uuid, handleClick }) {

    return (
        <Chip label={truncateUUID(uuid)}
              size="small"
              variant="outlined"
              onClick={handleClick}
              deleteIcon={<CopyIcon />}
              color="secondary"
              onDelete={() => navigator.clipboard.writeText(uuid)}
        >
            {uuid}
        </Chip>
    )
}