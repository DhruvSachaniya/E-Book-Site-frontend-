import React from 'react';

export default function TableData(props) {
  const pstyle = {
    marginTop: '2rem',
    marginLeft: '0.5rem',
    color: 'var(--color-silverockunivercity)',
  };

  return (
    <>
      {props.number !== null ? (
        props.number >= 1 ? (
          <p style={pstyle}>{props.number} Matching Record(s) found</p>
        ) : (
          <p style={pstyle}>No Matching Record(s) found</p>
        )
      ) : null}

      <table className="Search-Table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Department</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map((item) =>
              Array.isArray(item.Posts) ? (
                item.Posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.Name}</td>
                    <td>{post.Catalogue_name}</td>
                    <td>
                      <button
                        onClick={() =>
                          window.open(
                            `http://localhost:3333/uploads/${encodeURIComponent(
                              post.FileUrl,
                            )}`,
                          )
                        }
                        className="pdf-button"
                      >
                        PDF
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={item.id}>
                  <td>{item.Name}</td>
                  <td>{item.Catalogue_name}</td>
                  <td>
                    <button
                      onClick={() =>
                        window.open(
                          `http://localhost:3333/uploads/${encodeURIComponent(
                            item.FileUrl,
                          )}`,
                        )
                      }
                      className="pdf-button"
                    >
                      PDF
                    </button>
                  </td>
                </tr>
              ),
            )}
        </tbody>
      </table>
      {/* Add Pagination, React Redux, Material Ui */}
    </>
  );
}
