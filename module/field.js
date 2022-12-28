class Field{
    constructor(name, dataType, is_primary, is_sort_index, is_search_index, is_visible){
        this.id = id;
        this.label = name;
        this.value = dataType;
        this.type  = dataType;
        this.is_primary =  is_primary;
        this.is_sort_index =  is_sort_index;
        this.is_search_index =  is_search_index;
        this.is_visible =  is_visible;
    }

    getAll(){
        return{
            id: this.id,
            label: this.label,
            value: this.value,
            type: this.type,
            is_primary: this.is_primary,
            is_sort_index: this.is_sort_index,
            is_search_index: this.is_search_index,
            is_visible: this.is_visible,
        } /* Suspiciuso */
    }
    get_label(){
        return this.label;
    }
    get_value(){
        return this.value;
    }
    get_type(){
        return this.type;
    }
    get_is_primary(){
        return this.is_primary;
    }
    get_is_sort_index(){
        return this.is_sort_index;
    }
    get_is_search_index(){
        return this.is_search_index;
    }
    get_is_visible(){
        return this.is_visible;
    }

}


module.exports = {
    Field,
}
