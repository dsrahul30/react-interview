
const Volume = (props) => {
  return (
    <div className="volume-info-section" style={{display: 'block'}}>
        <table id="volume-info-table" className="volume-info-section">
            <thead>
                <tr>
                    <th>Volume Name</th>
                    <th>Volume Path</th>
                    <th>Quota [TB]</th>
                    <th>Used [TB]</th>
                    <th>Used Percentage (%)</th>
                </tr>
            </thead>
            <tbody id="volume-info-tbody" style={{background: getColorByPercentage(usedPercentage(props.used, props.quota))}}>
                <tr>
                    <td>{props.name}</td>
                    <td>{props.path}</td>
                    <td>{props.quota}</td>
                    <td>{props.used}</td>
                    <td>{usedPercentage(props.used, props.quota)}</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Volume;

const usedPercentage = (used, quota) => {
    return (used / quota * 100).toFixed(2);
}

const getColorByPercentage = (percentage) => {
    if (percentage < 50) {
        return 'linear-gradient(90deg, #4caf50, #81c784)';
    } else if (percentage >= 50 && percentage < 70) {
        return 'linear-gradient(90deg, #ffeb3b, #fff176)';
    } else if (percentage >= 80 && percentage < 90) {
        return 'linear-gradient(90deg, #ff9800, #ffb74d)';
    } else {
        return 'linear-gradient(90deg, #f44336, #e57373)';
    }
}