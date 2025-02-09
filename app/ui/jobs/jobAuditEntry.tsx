
import { JobAudit } from "@prisma/client";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo('en-GB')

interface JobAuditProps {
  audit: JobAudit
  userMap: Record<string, string>;
  index: number;
}

export default function JobAuditLog({ audit, userMap, index }: JobAuditProps) {

  const mapValue = (field: string|null, value: string|null) => {
    if(field === "status") {
     return (value || "").replaceAll("_"," ").toLowerCase()
    }
    if(field === "repairer") {
      return value? userMap[value] || value : "unassigned"
    }
    return value;
  }

  return (
    <li key={index} className="m-2">
    {audit.type === "CREATE" && 
      <div><b>Job Created</b> by <b>{audit.by}</b> <span title={audit.at.toLocaleDateString() +" at " + audit.at.toLocaleTimeString()}>{timeAgo.format(audit.at, 'round')}</span></div>
    }
    {audit.type === "DELETE" && 
      <div><b>Job Deleted</b> by <b>{audit.by}</b> <span title={audit.at.toLocaleDateString() +" at " + audit.at.toLocaleTimeString()}>{timeAgo.format(audit.at, 'round')}</span></div>
    }
    {audit.type === "UPDATE" && 
      <div>
        <b className="capitalize">{audit.field}</b> changed 
        { audit.previousValue !=null && 
          <span>
            &nbsp;from <b>{mapValue(audit.field, audit.previousValue)}</b>
          </span>
        } 
        { audit.newValue !=null && 
          <span>
            &nbsp;to <b>{mapValue(audit.field, audit.newValue)}</b>
          </span>
        } 
        &nbsp;by <b>{audit.by}</b> <span title={audit.at.toLocaleDateString() +" at " + audit.at.toLocaleTimeString()}>{timeAgo.format(audit.at, 'round')}</span>
      </div>
    }
    </li>
  );
}