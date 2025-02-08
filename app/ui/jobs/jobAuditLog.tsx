
import { JobAudit } from "@prisma/client";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo('en-GB')

interface JobAuditProps {
  jobAudits: JobAudit[] | undefined;
  userMap: Record<string, string>;
}

export default function JobAuditLog({ jobAudits, userMap }: JobAuditProps) {

  if (!jobAudits) {
    return <div>Loading...</div>
  }

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
    <div className="mt-10">
      <h2  className="m-2">Audit Log</h2>
      <ul>
        {jobAudits.map((audit, index) => {
          switch (audit.type) {
            case "CREATE": return <li key={index} className="m-2"><b>Job Created</b> by <b>{audit.by}</b> <span title={audit.at.toLocaleDateString() +" at " + audit.at.toLocaleTimeString()}>{timeAgo.format(audit.at, 'round')}</span></li>
            case "UPDATE": return <li key={index} className="m-2"><b className="capitalize">{audit.field}</b> changed from <b>{mapValue(audit.field, audit.previousValue)}</b> to <b>{mapValue(audit.field, audit.newValue)}</b> by <b>{audit.by}</b> <span title={audit.at.toLocaleDateString() +" at " + audit.at.toLocaleTimeString()}>{timeAgo.format(audit.at, 'round')}</span></li>
            case "DELETE": return <li key={index} className="m-2">Job <b>Deleted</b> by <b>{audit.by}</b> <span title={audit.at.toLocaleDateString() +" at " + audit.at.toLocaleTimeString()}>{timeAgo.format(audit.at, 'round')}</span></li>
          }
        })}
      </ul>
    </div>
  );
}
