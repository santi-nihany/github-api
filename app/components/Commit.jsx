import Link from "next/link";

export default function Commits({ data}) {
    console.log(data);
    return (
        <div className="grid gap-4">
            {data ? data.map((item) => {
                return (
                    <div key={item.sha}>
                        <div>{item.created_at}</div>
                        <div>{item.environment}</div>
                    </div>
                )
            }) : <div>loading...</div>
            }
        </div>
    )
}