export default function filteredGnomes(props) {
    const filterGnomes = props.posts.filter(
        (gnome) => {
          return gnome.name.toLowerCase().indexOf(props.searchInput.toLowerCase()) !== -1;
        }
      )
      return filterGnomes
}
